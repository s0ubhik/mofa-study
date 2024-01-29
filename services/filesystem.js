import * as FileSystem from 'expo-file-system';

export async function mkpath(path)
{
    const directoryPath = path.substring(0, path.lastIndexOf('/'));
    const { exists } = await FileSystem.getInfoAsync(directoryPath);
    if (!exists) 
        await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
}

export async function exists(path, type='doc')
{
    const fileUri = (type == 'doc') ?  `${FileSystem.documentDirectory}${path}` : `${FileSystem.cacheDirectory}${path}`;
    const {exists} =  await FileSystem.getInfoAsync(fileUri);
    return exists;
}

export async function read(path, type='doc', json=false)
{
    const fileUri = (type == 'doc') ?  `${FileSystem.documentDirectory}${path}` : `${FileSystem.cacheDirectory}${path}`;
    try {
        var content = await FileSystem.readAsStringAsync(fileUri);
        if (json) content = await JSON.parse(content);
        return content;
    } catch (error) {
        return false;
    }
}

export async function write(path, data, type='doc')
{
    const fileUri = (type == 'doc') ?  `${FileSystem.documentDirectory}${path}` : `${FileSystem.cacheDirectory}${path}`;
    try {
        await mkpath(fileUri);
        if (typeof data !== "string") data = await JSON.stringify(data);
        await FileSystem.writeAsStringAsync(fileUri, data);
        return true;
    } catch (error) {
        return false;
    }
}