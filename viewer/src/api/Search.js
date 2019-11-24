import Lunr from 'lunr';
import { Leaks } from './Leaks';

let searchIndex = null;

export function getSearchIndex() {
  if (searchIndex === null) {
    const { leaks } = Leaks;
    // searchIndex = getLeaks().then(leaks => {
    const index = Lunr(function configureLunr() {
      this.ref('id');
      this.field('sourceTypes');
      this.field('title');
      this.field('body');
      leaks.forEach(leak => {
        let title = null;
        for (const key in leak.source) {
          if (key === 'reddit' && leak.source.reddit !== null) {
            title = (leak.source.reddit.threads || leak.source.reddit.comments || []).map(x => x.title).find(x => !!x)
            break
          } else {
            let t = (leak.source[key] || []).map(x => x.title).find(x => !!x)
            if (t) {
              title = t;
              break;
            }
          }
        }
        this.add({
          id: `${leak.leakId}`,
          title,
          body: (leak.text || []).join('\n'),
          sourceTypes: (leak.sourceTypes || []).join(' ')
        });
      }, this);
    });
    searchIndex = index;
  }
  return searchIndex;
  // return await searchIndex;
}
