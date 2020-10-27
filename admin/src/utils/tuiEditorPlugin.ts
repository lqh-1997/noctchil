import Editor from '@toast-ui/editor';

export function bilibiliPlugin() {
    Editor.codeBlockManager.setReplacer('bilibili', (bilibiliId) => {
        const wrapperId = `bilibili${Math.random().toString(36).substr(2, 10)}`;
        setTimeout(renderBilibili.bind(null, wrapperId, bilibiliId), 0);
        return `<div id="${wrapperId}"></div>`;
    });
}

// FIXME 改成bilibili的链接
function renderBilibili(wrapperId: string, bilibiliId: string) {
    const el = document.querySelector(`#${wrapperId}`);

    el &&
        (el.innerHTML = `<iframe width="420" height="315" src="https://www.youtube.com/embed/${bilibiliId}"></iframe>`);
}
