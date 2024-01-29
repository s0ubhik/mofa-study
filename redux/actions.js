import * as gb from '../services/globals';
import {mkURL} from '../services/utils';
import {store} from '../redux/store';
import * as fs from '../services/filesystem';

async function getUpdate(type, url, filename)
{
    var cacheBoards = {update: ""};
    if ((await fs.exists(filename, 'cache'))){
        cacheBoards = await fs.read(filename, 'cache', true);
        store.dispatch({
            type: type,
            payload: cacheBoards.data
        });
    }

    const res = await fetch(url);
    if (res.status != 200) return;
    const data = await res.json();
    if (!data) return;
    if (data.update == cacheBoards.update) return; /* not updated */

    store.dispatch({
        type: type,
        payload: data.data
    });

    await fs.write(filename, data, 'cache');
}

export const getBoard = async () => 
    await getUpdate(gb.LOAD_BOARDS, mkURL("index.json"), "board.json");

export const getSubjects = async (board, sclass) =>
    await getUpdate(gb.LOAD_SUBJECTS, mkURL(`${board}/${sclass}/index.json`), `${board}-${sclass}.json`);

export const getChapters = async (board, sclass, subject) =>
    await getUpdate(gb.LOAD_CHAPTERS, mkURL(`${board}/${sclass}/${subject}.json`), `${board}-${sclass}-${subject}.json`)

export async function getFile(fileID)
{

}