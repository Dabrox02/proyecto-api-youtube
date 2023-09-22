const getData = async () => {
    let data = await (await fetch("data.json")).json();
    return data;
}

