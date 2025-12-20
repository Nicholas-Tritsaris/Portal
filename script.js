const files = {
  'README.txt': 'This is a retro portal. Use the terminal to interact with the system.',
  'system.log': 'SYSTEM: All systems nominal. No anomalies detected.'
};

document.addEventListener('DOMContentLoaded', () => {
  const log = document.getElementById('log');
  const welcomeMessage = 'Welcome to the Chaotic Science Portal. System booting...';
  typewriter(log, welcomeMessage);

  const commandInput = document.getElementById('command-input');
  const executeButton = document.getElementById('execute-button');

  function executeCommand() {
    const command = commandInput.value.trim();
    if (command) {
      const commandElement = document.createElement('div');
      commandElement.textContent = `> ${command}`;
      log.append(commandElement);
      handleCommand(command);
      commandInput.value = '';
      log.scrollTop = log.scrollHeight;
    }
  }

  executeButton.addEventListener('click', executeCommand);

  commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      executeCommand();
    }
  });
});

function handleCommand(command) {
  const log = document.getElementById('log');
  const [cmd, ...args] = command.split(' ');

  const output = document.createElement('div');

  switch (cmd) {
    case 'help':
      output.textContent = 'Available commands: help, ls, cat [file], clear';
      break;
    case 'ls':
      output.textContent = Object.keys(files).join('\n');
      break;
    case 'cat':
      if (args.length > 0 && files[args[0]]) {
        output.textContent = files[args[0]];
      } else {
        output.textContent = 'File not found.';
      }
      break;
    case 'clear':
      log.innerHTML = '';
      return;
    default:
      output.textContent = `Unknown command: ${command}`;
  }
  log.append(output);
}

function typewriter(element, text, speed = 50) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
