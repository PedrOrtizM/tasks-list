import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should filter according to the searchValue', () => {
    const pipe = new FilterPipe();
    const list = [{ name: 'JUAN' }, { name: 'LUCAS' }]
    expect(pipe.transform(list, 'jua').length).toBe(1);
    expect(pipe.transform(list, 'lu').length).toBe(1);
    expect(pipe.transform(list, 'Maria').length).toBe(0);
  });

  it('Should return list if the search value is invalid', () => {
    const pipe = new FilterPipe();
    const list = [{ name: 'JUAN' }, { name: 'LUCAS' }]
    expect(pipe.transform(list, '').length).toBe(2);
  });
  it('Should set default value', () => {
    const pipe = new FilterPipe();
    expect(pipe.transform(undefined,'').length).toBe(0);
    
  });

});
