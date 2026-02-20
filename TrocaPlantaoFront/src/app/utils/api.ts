export async function postTrocaForm(url: string, dados: any, priFiles?: FileList | null, secFiles?: FileList | null) {
    const form = new FormData();
    const jsonBlob = new Blob([JSON.stringify(dados)], { type: 'application/json' });
    form.append('dados', jsonBlob);


    if (priFiles) {
        for (let i = 0; i < priFiles.length; i++) form.append('pri_file', priFiles[i]);
    }
    if (secFiles) {
        for (let i = 0; i < secFiles.length; i++) form.append('sec_file', secFiles[i]);
    }


    const res = await fetch(url, {
        method: 'POST',
        body: form,
    });


    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ${res.status}: ${text}`);
    }


    return res.json();
}


export async function jsonGet(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ${res.status}: ${text}`);
    }
    return res.json();
}


export async function postJson(url: string, body: any) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ${res.status}: ${text}`);
    }
    return res.json();
}


export async function postNoBody(url: string) {
    const res = await fetch(url, { method: 'POST', credentials: 'include' });
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    return;
}


export async function del(url: string) {
    const res = await fetch(url, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    return;
}