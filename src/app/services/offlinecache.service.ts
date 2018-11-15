/**
 * see: https://github.com/greengerong/rebirth-storage
 */

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export const DEFAULT_STORAGE_POOL_KEY = 'rebirth-storage:default';

export enum StorageType {
  memory,
  sessionStorage,
  localStorage,
}

interface IDataCacheStrategy {
  name(): string;

  match(data: any): boolean;

  put(data: any, putStorage: (result: Object) => void): any;

  get(data: any): Object;
}

class RxDataCacheStrategy implements IDataCacheStrategy {
  name() {
    return 'RxDataCacheStrategy';
  }

  match(result: any): boolean {
    return result && result.subscribe;
  }

  put(result: any, putStorage: (data: Object) => void): Observable<any> {
    return result.pipe(
      map(data => {
        putStorage(data);
        return data;
      })
    );
  }

  get(result: any): Object {
    return from(Promise.resolve(result));
  }
}

class PromiseDataCacheStrategy implements IDataCacheStrategy {
  name() {
    return 'PromiseDataCacheStrategy';
  }

  match(result: any): boolean {
    return result && result.then;
  }

  put(result: any, putStorage: (data: Object) => void): Promise<any> {
    return result.then(data => putStorage(data));
  }

  get(result: any): Object {
    return Promise.resolve(result);
  }
}

class DataCacheStrategyFactory {
  private static factory: DataCacheStrategyFactory = new DataCacheStrategyFactory();
  private dataCacheStrategies: IDataCacheStrategy[];

  static getInstance(): DataCacheStrategyFactory {
    return DataCacheStrategyFactory.factory;
  }

  constructor() {
    this.dataCacheStrategies = [
      new RxDataCacheStrategy(),
      new PromiseDataCacheStrategy(),
    ];
  }

  put(options: { pool?: string; key: string }, value: any, storage: IStorage) {
    const strategy = this.dataCacheStrategies.find(t => t.match(value));
    if (strategy) {
      return strategy.put(value, result =>
        storage.put(options, { type: strategy.name(), result })
      );
    }
    storage.put(options, value);
    return value;
  }

  get(data: any): Object {
    if (data && data.type) {
      const strategy = this.dataCacheStrategies.find(
        t => t.name() === data.type
      );
      if (strategy) {
        return strategy.get(data.result);
      }
    }
    return data;
  }
}

export interface IStorage {
  getAll(pool: string): any;

  get(options: { pool?: string; key: string }): Object;

  put(options: { pool?: string; key: string }, value: Object): any;

  remove(options: { pool?: string; key?: string });

  removeAll();
}

export class WebStorage implements IStorage {
  constructor(private webStorage: Storage) {}

  getAll(pool: string) {
    const json = this.webStorage.getItem(pool);
    return json ? JSON.parse(json) : {};
  }

  saveAll(pool: string, storage) {
    this.webStorage.setItem(pool, JSON.stringify(storage));
  }

  get({
    pool = DEFAULT_STORAGE_POOL_KEY,
    key,
  }: {
    pool?: string;
    key: string;
  }): Object {
    const storage = this.getAll(pool);
    return storage[key];
  }

  put(
    { pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string; key: string },
    value: Object
  ): any {
    const storage = this.getAll(pool);
    storage[key] = value;
    return this.saveAll(pool, storage);
  }

  remove({
    pool = DEFAULT_STORAGE_POOL_KEY,
    key,
  }: {
    pool?: string;
    key?: string;
  }) {
    if (!key) {
      this.webStorage.removeItem(pool);
      return;
    }

    this.put({ pool, key }, null);
  }

  removeAll() {
    this.webStorage.clear();
  }
}

export class MemoryStorage implements IStorage {
  private storage: Map<string, Map<string, Object>>;

  constructor() {
    this.storage = new Map<string, Map<string, Object>>();
  }

  getAll(pool: string): any {
    return this.storage.has(pool)
      ? this.storage.get(pool)
      : new Map<string, Object>();
  }

  get({
    pool = DEFAULT_STORAGE_POOL_KEY,
    key,
  }: {
    pool?: string;
    key: string;
  }): Object {
    const storage = this.getAll(pool);
    return storage.has(key) ? cloneDeep(storage.get(key)) : null;
  }

  put(
    { pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string; key: string },
    value: Object
  ) {
    if (!this.storage.has(pool)) {
      this.storage.set(pool, new Map<string, Object>());
    }
    (this.storage.get(pool) as any).set(key, cloneDeep(value));
  }

  remove({
    pool = DEFAULT_STORAGE_POOL_KEY,
    key,
  }: {
    pool?: string;
    key?: string;
  }) {
    if (!key) {
      this.storage.delete(pool);
      return;
    }

    const poolStorage = this.storage.get(pool);
    if (poolStorage) {
      poolStorage.delete(key);
    }
  }

  removeAll() {
    this.storage = new Map<string, Map<string, Object>>();
  }
}

@Injectable()
export class StorageService {
  sessionStorage: Storage;
  localStorage: Storage;
  memoryStorage: MemoryStorage;
  storages: Map<Object, IStorage>;

  private defaultStorageType: StorageType = StorageType.memory;

  constructor() {
    this.setupStorages();
  }

  setDefaultStorageType(storageType: StorageType): void {
    this.defaultStorageType = storageType;
  }

  getAll({
    pool,
    storageType,
  }: {
    pool: string;
    storageType?: StorageType;
  }): any {
    const storage: IStorage = <IStorage>(
      this.storages.get(storageType || this.defaultStorageType)
    );
    return storage.getAll(pool);
  }

  get({
    pool,
    key,
    storageType,
  }: {
    pool?: string;
    key: string;
    storageType?: StorageType;
  }): Object {
    const data = (this.storages.get(
      storageType || this.defaultStorageType
    ) as any).get({ pool, key });
    return DataCacheStrategyFactory.getInstance().get(data);
  }

  put(
    {
      pool,
      key,
      storageType,
    }: { pool?: string; key: string; storageType?: StorageType },
    value: Object
  ): any {
    const storage: any = this.storages.get(
      storageType || this.defaultStorageType
    );
    return DataCacheStrategyFactory.getInstance().put(
      { pool, key },
      value,
      storage
    );
  }

  remove({
    pool,
    key,
    storageType,
  }: {
    pool?: string;
    key?: string;
    storageType?: StorageType;
  }) {
    return (this.storages.get(
      storageType || this.defaultStorageType
    ) as any).remove({ pool, key });
  }

  removeAll({ storageType }: { storageType?: StorageType }) {
    return (this.storages.get(
      storageType || this.defaultStorageType
    ) as any).removeAll();
  }

  private setupStorages() {
    this.storages = new Map<String, IStorage>();
    this.memoryStorage = new MemoryStorage();

    if (window) {
      this.sessionStorage = window.sessionStorage;
      this.localStorage = window.localStorage;
      this.storages
        .set(StorageType.memory, this.memoryStorage)
        .set(StorageType.sessionStorage, new WebStorage(this.sessionStorage))
        .set(StorageType.localStorage, new WebStorage(this.localStorage));
      return;
    }

    this.storages
      .set(StorageType.memory, this.memoryStorage)
      .set(StorageType.sessionStorage, this.memoryStorage)
      .set(StorageType.localStorage, this.memoryStorage);
  }
}

export class StorageFactory {
  private static storageService: StorageService = new StorageService();

  static getStorageService(): StorageService {
    return StorageFactory.storageService;
  }
}

export function Cacheable({
  pool = DEFAULT_STORAGE_POOL_KEY,
  key,
  storageType = StorageType.memory,
}: { pool?: string; key?: string; storageType?: StorageType } = {}) {
  const storageService = StorageFactory.getStorageService();
  const getKey = (target: any, method: string, args: Object[]) => {
    // TODO: we can change this code or override object toString method;
    const prefix = key || `${target.constructor.name}.${method}`;
    return `${prefix}:${args.join('-')}`;
  };

  return function(target: any, name: string, methodInfo: any) {
    const method = methodInfo.value;

    const proxy = function(...args) {
      const pkey = getKey(target, name, args || []);
      const data = storageService.get({ pool, key: pkey, storageType });
      if (data) {
        return data;
      }

      const result = method.apply(this, args || []);
      return storageService.put({ pool, key: pkey, storageType }, result);
    };

    (<any>proxy).cacheEvict = function() {
      storageService.remove({ pool, key });
    };

    return {
      value: proxy,
    };
  };
}

export function Offlinecache({
  pool = DEFAULT_STORAGE_POOL_KEY,
  key,
  storageType = StorageType.memory,
}: { pool?: string; key?: string; storageType?: StorageType } = {}) {
  const storageService = StorageFactory.getStorageService();
  const getKey = (target: any, method: string, args: Object[]) => {
    const prefix = key || `${target.constructor.name}.${method}`;
    return `${prefix}:${args.join('-')}`;
  };

  return function(target: any, name: string, methodInfo: any) {
    const method = methodInfo.value;
    const proxy = function(...args) {
      const pkey = getKey(target, name, args || []);
      const data = storageService.get({ pool, key: pkey, storageType });
      if (data && this.native.isOffline()) {
        return data;
      }

      const result = method.apply(this, args || []);
      return storageService.put({ pool, key: pkey, storageType }, result);
    };

    (<any>proxy).cacheEvict = function() {
      storageService.remove({ pool, key });
    };

    return {
      value: proxy,
    };
  };
}

export const REBIRTH_STORAGE_PROVIDERS: Array<any> = [
  {
    provide: StorageService,
    useClass: StorageService,
  },
];
