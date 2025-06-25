document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main-area');
  const generateBtn = document.getElementById('generate');
  const checkBtn = document.getElementById('check');
  const scriptOut = document.getElementById('script-output');
  const downloadLink = document.getElementById('download-link');
  const themeToggle = document.getElementById('theme-toggle');
  let count = 0;

  function addComponent(type) {
    count++;
    const group = document.createElement('div');
    group.classList.add('form-group');
    const label1 = document.createElement('label');
    label1.textContent = `${type} Name:`;
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = `${type} Name`;
    const label2 = document.createElement('label');
    label2.textContent = `${type} Function:`;
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'function(...) ... end';
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.classList.add('remove-btn');
    removeBtn.title = 'Remove this element';
    removeBtn.addEventListener('click', () => main.removeChild(group));

    group.appendChild(removeBtn);
    group.appendChild(label1);
    group.appendChild(inputName);
    group.appendChild(label2);
    group.appendChild(textarea);
    main.appendChild(group);
  }

  document.getElementById('add-toggle').onclick = () => addComponent('Toggle');
  document.getElementById('add-button').onclick = () => addComponent('Button');
  document.getElementById('add-slider').onclick = () => addComponent('Slider');
  document.getElementById('add-textbox').onclick = () => addComponent('TextBox');
  document.getElementById('add-label').onclick = () => addComponent('Label');

  themeToggle.onclick = () => {
    document.body.classList.toggle('light');
  };

  generateBtn.onclick = () => {
    let code = '';
    const groups = main.querySelectorAll('.form-group');
    groups.forEach(group => {
      const name = group.querySelector('input').value.trim();
      const func = group.querySelector('textarea').value.trim();
      const type = group.querySelector('label').textContent.replace(' Name:', '');
      if (!name || !func) return;
      code += `-- ${type}: ${name}\n`;
      code += `local ${name} = library.add${type}("${name}")\n`;
      code += `${name}:OnClick(${func})\n\n`;
    });
    scriptOut.value = code;
  };

  checkBtn.onclick = () => {
    const funcs = main.querySelectorAll('textarea');
    for (let ta of funcs) {
      const txt = ta.value.trim();
      if (!txt.startsWith('function') || !txt.endsWith('end')) {
        alert('Each callback must start with "function" and end with "end".');
        return;
      }
    }
    alert('All callbacks look good!');
  };

  downloadLink.onclick = () => {
    const code = scriptOut.value;
    if (!code) { alert('Generate the script first!'); return; }
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = 'script.lua';
    downloadLink.click();
    URL.revokeObjectURL(url);
  };
});