import HashStorage from './public/HashStorage';

const storage = new HashStorage;

window.addEventListener('load', () => {
	console.log(storage.hashToSkillStorage('aBCD'));
	console.log(storage.skillStorageToHash([1,2,2,2]));
});
