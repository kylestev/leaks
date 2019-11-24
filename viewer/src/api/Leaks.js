import Vue from 'vue';
import { DateTime } from 'luxon';
// import Axios from 'axios';

// let promise = null;

function getSources({ source }) {
  const sources = [];
  if (source.news) sources.push('Official News');
  if (source.wiki) sources.push('OSRS Wiki');
  if (source.youtube) sources.push('YouTube');
  if (source.reddit) sources.push('Reddit');
  if (source.tweet) sources.push('Twitter');
  return sources;
}

const _Leaks = (leaks => {
  const xs = [];
  for (const leak of leaks) {
    if (leak.meta && typeof leak.meta.postedAt === 'string') {
      leak.meta.postedAt = DateTime.fromISO(leak.meta.postedAt);
      leak.postedAt = leak.meta.postedAt.toFormat('DDD');
    }
    leak.leakId = +leak.leakId;
    xs.push({ ...leak, sourceTypes: getSources(leak) });
  }
  return xs;
})(require('../data/leaks.json'));

export function getLeaks() {
  return _Leaks;
}

export const Leaks = new Vue({
  data: () => ({
    leaks: _Leaks
  })
});
