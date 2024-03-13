const symbols = ['🍒', '🍋', '🍇', '🍊', '🍉', '🔔'];
let balance = 100; 

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateBalance(newBalance) {
    const balanceDisplay = document.getElementById('balance');
    balanceDisplay.textContent = newBalance;
}

function spin() {
    const table = document.getElementById('slot');
    const resultDisplay = document.getElementById('result');
    const betAmount = parseInt(document.getElementById('betAmount').value);

    if (balance < betAmount) {
        alert('Недостаточно средств для ставки!');
        return;
    }

    balance -= betAmount;
    updateBalance(balance);

    const cells = table.querySelectorAll('td');
    cells.forEach(cell => cell.classList.remove('win-cell'));

    const result = [];
    for (let row = 0; row < 3; row++) {
        const newRow = [];
        for (let col = 0; col < 6; col++) {
            const symbol = getRandomSymbol();
            table.rows[row].cells[col].textContent = symbol;
            newRow.push(symbol);
        }
        result.push(newRow);
    }

    let winnings = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            const symbolsInLine = [result[row][col], result[row][col + 1], result[row][col + 2]];
            if (symbolsInLine.every(symbol => symbol === symbolsInLine[0])) {
                winnings += betAmount * (symbolsInLine.length + 1); 
                for (let i = 0; i < 3; i++) {
                    table.rows[row].cells[col + i].classList.add('win-cell');
                }
            }
        }
    }

    balance += winnings;
    updateBalance(balance);

    resultDisplay.textContent = `Выигрыш: ${winnings}`;
}

function openDepositModal() {
    const modal = document.getElementById('depositModal');
    modal.style.display = 'block';
}

function closeDepositModal() {
    const modal = document.getElementById('depositModal');
    modal.style.display = 'none';
}

function confirmDeposit() {
    const depositAmount = parseInt(document.getElementById('depositAmount').value);
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert('Пожалуйста, введите корректную сумму для депозита.');
        return;
    }

    balance += depositAmount;
    updateBalance(balance);

    alert(`Средства в размере ${depositAmount} зачислены на ваш баланс.`);
    closeDepositModal();
}

function openWithdrawModal() {
    const modal = document.getElementById('withdrawModal');
    modal.style.display = 'block';
}

function closeWithdrawModal() {
    const modal = document.getElementById('withdrawModal');
    modal.style.display = 'none';
}

function confirmWithdraw() {
    const withdrawAmount = parseInt(document.getElementById('withdrawAmount').value);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        alert('Пожалуйста, введите корректную сумму для вывода.');
        return;
    }

    if (withdrawAmount > balance) {
        alert('Недостаточно средств на балансе для вывода.');
        return;
    }

    balance -= withdrawAmount;
    updateBalance(balance);

    alert(`Сумма в размере ${withdrawAmount} успешно выведена.`);
    closeWithdrawModal();
}
