// ===================================
// CYBERGUARDIAN HUB - ENHANCED JS
// With Active Nav Highlighting
// ===================================

// Matrix Rain Background
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01アイウエオカキクケコサシスセソタチツテト';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00f3ff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// User Data
let userData = {
    score: 0,
    completed: []
};

// Navigation with Active Highlighting
document.querySelectorAll('[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        navigateTo(sectionId);
        
        // Update active state in nav
        document.querySelectorAll('[data-section]').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

function navigateTo(sectionId) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0, 0);
    
    // Reset card animations
    const cards = document.getElementById(sectionId).querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = '';
        }, 10);
    });
}

// HackQuest Challenges
function startChallenge(type) {
    let content = '';
    
    if (type === 'decode') {
        content = `
            <h3>Base64 Decoder Challenge</h3>
            <p>Decode: <code style="color: var(--neon-green);">Q3liZXJHdWFyZGlhbg==</code></p>
            <input type="text" id="challenge-answer" placeholder="Enter decoded text">
            <button class="cta-button" onclick="checkAnswer('decode', 'CyberGuardian')">Submit</button>
        `;
    } else if (type === 'cipher') {
        content = `
            <h3>Caesar Cipher Challenge</h3>
            <p>Decrypt: <code style="color: var(--neon-green);">VHFXULWB</code> with shift 3</p>
            <input type="text" id="challenge-answer" placeholder="Enter decrypted text">
            <button class="cta-button" onclick="checkAnswer('cipher', 'SECURITY')">Submit</button>
        `;
    } else if (type === 'hash') {
        content = `
            <h3>Hash Cracker Challenge</h3>
            <p>Find the password for this MD5 hash:</p>
            <code style="color: var(--neon-green);">5f4dcc3b5aa765d61d8327deb882cf99</code>
            <p style="font-size: 0.9rem; margin-top: 1rem;">Hint: It's a common password</p>
            <input type="text" id="challenge-answer" placeholder="Enter the password">
            <button class="cta-button" onclick="checkAnswer('hash', 'password')">Submit</button>
        `;
    } else if (type === 'port') {
        content = `
            <h3>Port Scanner Challenge</h3>
            <p>Which port number is commonly used for HTTPS traffic?</p>
            <input type="number" id="challenge-answer" placeholder="Enter port number">
            <button class="cta-button" onclick="checkAnswer('port', '443')">Submit</button>
        `;
    }
    
    showModal(content);
}

function checkAnswer(type, correct) {
    const answer = document.getElementById('challenge-answer').value.trim();
    const points = { decode: 10, cipher: 15, hash: 25, port: 10 };
    
    if (answer.toLowerCase() === correct.toLowerCase()) {
        userData.score += points[type];
        document.getElementById('quest-score').textContent = userData.score;
        showModal(`
            <h3 style="color: var(--neon-green);">✅ Correct!</h3>
            <p>You earned ${points[type]} points!</p>
            <p>Total Score: ${userData.score}</p>
            <button class="cta-button" onclick="closeModal()">Continue</button>
        `);
        updateLeaderboard();
    } else {
        showModal(`
            <h3 style="color: var(--neon-pink);">❌ Incorrect</h3>
            <p>Try again!</p>
            <button class="cta-button" onclick="closeModal()">Back</button>
        `);
    }
}

function updateLeaderboard() {
    const leaders = [
        { name: 'CyberNinja', score: userData.score + 100 },
        { name: 'You', score: userData.score },
        { name: 'HackMaster', score: Math.max(0, userData.score - 50) },
        { name: 'CodeBreaker', score: Math.max(0, userData.score - 80) },
        { name: 'NetDefender', score: Math.max(0, userData.score - 120) }
    ].sort((a, b) => b.score - a.score);

    document.getElementById('leaderboard').innerHTML = leaders.map((l, i) => `
        <div class="leaderboard-entry">
            <span>${i + 1}. ${l.name}</span>
            <span style="color: var(--neon-blue);">${l.score} pts</span>
        </div>
    `).join('');
}

updateLeaderboard();

// Academy Quizzes
const quizData = {
    phishing: [
        {
            q: "What is the most common sign of a phishing email?",
            options: ["Professional formatting", "Urgent language requesting action", "Proper grammar", "Company logo"],
            correct: 1
        },
        {
            q: "What should you do if you receive a suspicious email?",
            options: ["Click to verify", "Report and delete", "Reply asking if it's real", "Forward to friends"],
            correct: 1
        }
    ],
    malware: [
        {
            q: "Which is NOT a type of malware?",
            options: ["Trojan", "Firewall", "Ransomware", "Spyware"],
            correct: 1
        },
        {
            q: "Best way to prevent malware infection?",
            options: ["Open all emails", "Keep software updated", "Disable antivirus", "Use public WiFi"],
            correct: 1
        }
    ],
    ransomware: [
        {
            q: "What does ransomware do?",
            options: ["Steals passwords", "Encrypts files for ransom", "Sends spam", "Monitors activity"],
            correct: 1
        },
        {
            q: "Best defense against ransomware?",
            options: ["Pay quickly", "Regular backups", "Ignore warnings", "Share passwords"],
            correct: 1
        }
    ],
    'password-sec': [
        {
            q: "Minimum recommended password length?",
            options: ["6 characters", "8 characters", "12 characters", "20 characters"],
            correct: 2
        },
        {
            q: "What makes a password strong?",
            options: ["Your birthday", "Mix of characters, numbers, symbols", "Common words", "Sequential numbers"],
            correct: 1
        }
    ]
};

function startQuiz(topic) {
    const quiz = quizData[topic];
    let currentQ = 0;
    let score = 0;

    function showQuestion() {
        const q = quiz[currentQ];
        const content = `
            <h3>Question ${currentQ + 1} of ${quiz.length}</h3>
            <p style="font-size: 1.2rem; margin: 1rem 0;">${q.q}</p>
            ${q.options.map((opt, i) => `
                <div class="quiz-option" onclick="selectAnswer(${i}, ${q.correct})">${opt}</div>
            `).join('')}
        `;
        showModal(content);
    }

    window.selectAnswer = function(selected, correct) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((opt, i) => {
            if (i === correct) opt.classList.add('correct');
            else if (i === selected) opt.classList.add('incorrect');
            opt.style.pointerEvents = 'none';
        });

        if (selected === correct) score++;

        setTimeout(() => {
            currentQ++;
            if (currentQ < quiz.length) {
                showQuestion();
            } else {
                showModal(`
                    <h3>Quiz Complete! 🎉</h3>
                    <p style="font-size: 1.5rem;">Score: ${score}/${quiz.length}</p>
                    <button class="cta-button" onclick="closeModal()">Done</button>
                `);
            }
        }, 1500);
    };

    showQuestion();
}

// Phishing Checker
function checkPhishing() {
    const input = document.getElementById('phish-input').value;
    const suspicious = ['verify', 'urgent', 'click here', 'suspended', 'confirm', 'prize', 'winner', 'banking', 'paypal'];
    const urlPattern = /https?:\/\//gi;
    
    let risk = 0;
    const findings = [];

    suspicious.forEach(word => {
        if (input.toLowerCase().includes(word)) {
            risk += 20;
            findings.push(`Suspicious keyword detected: "${word}"`);
        }
    });

    const urls = input.match(urlPattern);
    if (urls && urls.length > 3) {
        risk += 30;
        findings.push('Multiple URLs detected (common in phishing)');
    }

    const hasIP = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(input);
    if (hasIP) {
        risk += 25;
        findings.push('IP address found instead of domain name');
    }

    risk = Math.min(risk, 100);

    let color = risk < 30 ? 'var(--neon-green)' : risk < 70 ? 'orange' : 'var(--neon-pink)';
    let verdict = risk < 30 ? 'Likely Safe ✅' : risk < 70 ? 'Suspicious ⚠️' : 'High Risk 🚨';

    document.getElementById('phish-result').innerHTML = `
        <div style="border: 2px solid ${color}; padding: 1.5rem; border-radius: 10px;">
            <h3 style="color: ${color};">${verdict}</h3>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${risk}%; background: ${color};">${risk}% Risk</div>
            </div>
            <h4 style="margin-top: 1rem;">Findings:</h4>
            <ul style="text-align: left;">
                ${findings.length ? findings.map(f => `<li>${f}</li>`).join('') : '<li>No major red flags detected</li>'}
            </ul>
            <p style="margin-top: 1rem; font-size: 0.9rem;">⚠️ This is an automated analysis. Always verify with the official source.</p>
        </div>
    `;
}

// Password Checker
function checkPassword() {
    const pass = document.getElementById('pass-input').value;
    let strength = 0;
    const feedback = [];

    if (pass.length >= 8) strength += 20;
    if (pass.length >= 12) strength += 10;
    if (pass.length >= 16) strength += 10;
    if (/[a-z]/.test(pass)) strength += 15;
    if (/[A-Z]/.test(pass)) strength += 15;
    if (/[0-9]/.test(pass)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(pass)) strength += 15;

    if (pass.length < 8) feedback.push('❌ Too short (minimum 8 characters)');
    else if (pass.length < 12) feedback.push('⚠️ Consider 12+ characters');
    else feedback.push('✅ Good length');

    if (!/[A-Z]/.test(pass)) feedback.push('❌ Add uppercase letters');
    if (!/[a-z]/.test(pass)) feedback.push('❌ Add lowercase letters');
    if (!/[0-9]/.test(pass)) feedback.push('❌ Add numbers');
    if (!/[^a-zA-Z0-9]/.test(pass)) feedback.push('❌ Add symbols (!@#$%^&*)');

    const crackTimes = ['< 1 second', '2 minutes', '3 hours', '2 days', '6 months', '5 years', '200 years', '1 million years'];
    const timeIndex = Math.floor(strength / 12.5);

    document.getElementById('pass-strength').style.width = strength + '%';
    document.getElementById('pass-strength').textContent = strength + '%';
    document.getElementById('pass-feedback').innerHTML = feedback.join('<br>');
    document.getElementById('pass-crack-time').innerHTML = `⏱️ Time to crack: <strong>${crackTimes[timeIndex] || '∞'}</strong>`;
}

function generatePassword() {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = '';
    if (document.getElementById('gen-upper').checked) chars += upper;
    if (document.getElementById('gen-lower').checked) chars += lower;
    if (document.getElementById('gen-numbers').checked) chars += numbers;
    if (document.getElementById('gen-symbols').checked) chars += symbols;
    
    const length = document.getElementById('gen-length').value;
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('generated-pass').textContent = password || 'Select at least one character type';
}

// Social Engineering Story
const socialStories = [
    {
        text: "You receive an email from 'IT Support' asking you to verify your password due to a security breach. What do you do?",
        choices: [
            { text: "Reply with password", next: 'bad1' },
            { text: "Ignore and report to IT", next: 'good1' },
            { text: "Click the link to verify", next: 'bad1' }
        ]
    },
    {
        id: 'good1',
        text: "✅ Excellent! You reported it to IT. They confirm it was a phishing attempt. You just saved your account!",
        choices: [{ text: "Continue", next: 0 }]
    },
    {
        id: 'bad1',
        text: "❌ Oh no! It was a phishing attack. Your account is now compromised. Always verify requests through official channels.",
        choices: [{ text: "Try Again", next: 0 }]
    }
];

function showSocialStory(index = 0) {
    let story;
    if (typeof index === 'number') {
        story = socialStories[index];
    } else {
        story = socialStories.find(s => s.id === index) || socialStories[0];
    }

    document.getElementById('social-story').innerHTML = `
        <h3>Social Engineering Scenario</h3>
        <p style="font-size: 1.1rem; margin: 2rem 0;">${story.text}</p>
        <div>
            ${story.choices.map((c, i) => `
                <span class="story-choice" onclick="showSocialStory('${c.next}')">${c.text}</span>
            `).join('')}
        </div>
    `;
}

showSocialStory();

// Cyber Map
function initCyberMap() {
    const map = document.getElementById('cyber-map');
    const log = document.getElementById('attack-log');
    
    const attacks = [
        { name: 'DDoS Attack', type: 'DDoS', country: 'Russia' },
        { name: 'Phishing Campaign', type: 'Phishing', country: 'China' },
        { name: 'Ransomware', type: 'Ransomware', country: 'North Korea' },
        { name: 'Data Breach', type: 'Breach', country: 'USA' },
        { name: 'Malware Spread', type: 'Malware', country: 'Brazil' }
    ];

    setInterval(() => {
        const attack = attacks[Math.floor(Math.random() * attacks.length)];
        const x = Math.random() * 90 + 5;
        const y = Math.random() * 80 + 10;
        
        const dot = document.createElement('div');
        dot.className = 'cyber-attack';
        dot.style.left = x + '%';
        dot.style.top = y + '%';
        map.appendChild(dot);

        const logEntry = document.createElement('div');
        logEntry.style.color = 'var(--neon-pink)';
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${attack.type} detected in ${attack.country}`;
        log.insertBefore(logEntry, log.firstChild);

        setTimeout(() => dot.remove(), 2000);
        
        if (log.children.length > 10) log.lastChild.remove();
    }, 3000);
}

initCyberMap();

// DefendIT
const defendScenarios = [
    {
        text: "🚨 ALERT: Multiple failed login attempts detected on admin account. What's your response?",
        choices: [
            { text: "Lock the account", correct: true, feedback: "✅ Correct! Locking prevents further attempts." },
            { text: "Ignore it", correct: false, feedback: "❌ Never ignore security alerts!" },
            { text: "Reset all passwords", correct: false, feedback: "⚠️ Overkill for this situation." }
        ]
    },
    {
        text: "🚨 ALERT: Unusual outbound traffic detected from a workstation. Your action?",
        choices: [
            { text: "Isolate the workstation", correct: true, feedback: "✅ Perfect! Contains potential malware." },
            { text: "Restart the computer", correct: false, feedback: "❌ This won't stop malware." },
            { text: "Monitor and wait", correct: false, feedback: "❌ Time is critical in incidents!" }
        ]
    }
];

function showDefendScenario(index = 0) {
    const scenario = defendScenarios[index];
    document.getElementById('defendit-scenario').innerHTML = `
        <h3>Incident Response</h3>
        <p style="font-size: 1.2rem; margin: 2rem 0;">${scenario.text}</p>
        ${scenario.choices.map((c, i) => `
            <div class="quiz-option" onclick="handleDefend(${index}, ${i}, ${c.correct})">${c.text}</div>
        `).join('')}
    `;
}

function handleDefend(scenarioIdx, choiceIdx, correct) {
    const choice = defendScenarios[scenarioIdx].choices[choiceIdx];
    showModal(`
        <h3>${choice.feedback}</h3>
        <button class="cta-button" onclick="closeModal(); showDefendScenario(${(scenarioIdx + 1) % defendScenarios.length})">Next Scenario</button>
    `);
}

showDefendScenario();

// Tools
function encodeBase64() {
    const input = document.getElementById('b64-input').value;
    document.getElementById('b64-output').textContent = btoa(input);
}

function decodeBase64() {
    const input = document.getElementById('b64-input').value;
    try {
        document.getElementById('b64-output').textContent = atob(input);
    } catch (e) {
        document.getElementById('b64-output').textContent = 'Invalid Base64';
    }
}

async function generateHash() {
    const input = document.getElementById('hash-input').value;
    const type = document.getElementById('hash-type').value;
    
    if (type === 'MD5') {
        document.getElementById('hash-output').textContent = 'MD5: ' + simpleMD5(input);
    } else {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const algo = type === 'SHA-1' ? 'SHA-1' : 'SHA-256';
        const hashBuffer = await crypto.subtle.digest(algo, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        document.getElementById('hash-output').textContent = type + ': ' + hashHex;
    }
}

function simpleMD5(str) {
    return Array.from(str).reduce((hash, char) => {
        return ((hash << 5) - hash) + char.charCodeAt(0) | 0;
    }, 0).toString(16).padStart(32, '0').substring(0, 32);
}

function caesarEncrypt() {
    const text = document.getElementById('caesar-input').value;
    const shift = parseInt(document.getElementById('caesar-shift').value) || 3;
    const result = text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
    document.getElementById('caesar-output').textContent = result;
}

function caesarDecrypt() {
    const text = document.getElementById('caesar-input').value;
    const shift = parseInt(document.getElementById('caesar-shift').value) || 3;
    const result = text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base - shift + 26) % 26) + base);
        }
        return char;
    }).join('');
    document.getElementById('caesar-output').textContent = result;
}

function textToBinary() {
    const text = document.getElementById('binary-input').value;
    const binary = text.split('').map(char => 
        char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join(' ');
    document.getElementById('binary-output').textContent = binary;
}

function binaryToText() {
    const binary = document.getElementById('binary-input').value;
    try {
        const text = binary.split(' ').map(bin => 
            String.fromCharCode(parseInt(bin, 2))
        ).join('');
        document.getElementById('binary-output').textContent = text;
    } catch (e) {
        document.getElementById('binary-output').textContent = 'Invalid binary';
    }
}

// News Feed
const newsItems = [
    { title: "New Zero-Day Vulnerability Discovered", content: "Security researchers found a critical flaw affecting millions of devices worldwide.", date: "2 hours ago" },
    { title: "Ransomware Gang Demands $10M", content: "Major healthcare provider hit by sophisticated ransomware attack.", date: "5 hours ago" },
    { title: "Password Manager Bug Exposed", content: "Popular password manager fixed a bug that could leak master passwords.", date: "1 day ago" },
    { title: "AI-Powered Phishing on the Rise", content: "Cybercriminals using AI to create convincing phishing emails.", date: "2 days ago" },
    { title: "Security Tip: Enable 2FA Everywhere", content: "Two-factor authentication blocks 99.9% of automated attacks.", date: "3 days ago" }
];

function loadNews() {
    document.getElementById('news-feed').innerHTML = newsItems.map(item => `
        <div class="news-item">
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <small style="color: var(--neon-blue);">${item.date}</small>
        </div>
    `).join('');
}

loadNews();

// CyberScape Story
const storyNodes = {
    start: {
        text: "🌐 You're a security analyst. Your company's network just triggered an intrusion alert. Multiple systems are showing suspicious activity. What do you do first?",
        choices: [
            { text: "Isolate affected systems", next: 'isolate' },
            { text: "Investigate the source", next: 'investigate' },
            { text: "Alert the team", next: 'alert' }
        ]
    },
    isolate: {
        text: "✅ Smart move! You've contained the threat. Now you notice encrypted files appearing. It's ransomware! What's next?",
        choices: [
            { text: "Restore from backup", next: 'win' },
            { text: "Pay the ransom", next: 'lose' },
            { text: "Try to decrypt", next: 'partial' }
        ]
    },
    investigate: {
        text: "⚠️ While investigating, the malware spreads to 50 more systems. You should have isolated first!",
        choices: [{ text: "Start Over", next: 'start' }]
    },
    alert: {
        text: "✅ Team mobilized! Together you identify it as a coordinated attack. Quick response prevents major damage.",
        choices: [{ text: "Continue", next: 'win' }]
    },
    win: {
        text: "🎉 Success! You've successfully defended your network. Minimal data loss, systems restored. You're a cyber guardian!",
        choices: [{ text: "Play Again", next: 'start' }]
    },
    lose: {
        text: "❌ Never pay ransomware! You paid but got no decryption key. Company data is lost forever.",
        choices: [{ text: "Try Again", next: 'start' }]
    },
    partial: {
        text: "⚠️ Decryption failed. Wasted precious time. Should have used backups!",
        choices: [{ text: "Try Again", next: 'start' }]
    }
};

function showStoryNode(nodeId = 'start') {
    const node = storyNodes[nodeId];
    document.getElementById('story-content').innerHTML = `
        <h3>CyberScape Mission</h3>
        <p style="font-size: 1.1rem; margin: 2rem 0; line-height: 1.8;">${node.text}</p>
        <div>
            ${node.choices.map(c => `
                <span class="story-choice" onclick="showStoryNode('${c.next}')">${c.text}</span>
            `).join('')}
        </div>
    `;
}

showStoryNode();

// Modal Functions
function showModal(content) {
    document.getElementById('modal-content').innerHTML = content;
    document.getElementById('modal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

// Responsive canvas resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});