# Membuat js/app.bundle.js (index.html) dan js/demo.bundle.js (demo.html) dari modul di js/.
# Bundle berupa script klasik, jadi bisa dibuka langsung via file://. Jalankan ulang setelah mengubah js/:
#   python tools/build-demo.py
import re, pathlib
J = pathlib.Path(__file__).resolve().parent.parent / 'js'
LIB = ['theme', 'icons', 'pricing', 'validators', 'defaults', 'catalog', 'message', 'render']
for out_name, entry in [('app', 'main'), ('demo', 'demo')]:
    out = []
    for n in LIB + [entry]:
        s = (J / f'{n}.js').read_text(encoding='utf-8')
        s = re.sub(r'^import[^;]*;\s*$', '', s, flags=re.M)
        s = re.sub(r'^export (async )?(function|const)', r'\1\2', s, flags=re.M)
        out.append(s)
    (J / f'{out_name}.bundle.js').write_text('/* AUTO-GENERATED oleh tools/build-demo.py, jangan diedit manual */\n(()=>{\n' + '\n'.join(out) + '\n})();\n', encoding='utf-8')
print('ok')
