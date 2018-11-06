import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the right title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Ionic Boilerplate');
  });
});
