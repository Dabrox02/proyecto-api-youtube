export const request = async ({ uri, config }) => {
    let data = config ? await (await fetch(uri, config)).json() : await (await fetch(uri)).json();
    return data;
}
