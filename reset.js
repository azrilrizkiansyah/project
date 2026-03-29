function goStep(n) {

                document.querySelectorAll('.panel').forEach((p, i) => {
                    p.classList.toggle('active', i + 1 === n);
                });

                document.querySelectorAll('.step').forEach((s, i) => {
                    s.classList.remove('active', 'done');
                    if (i + 1 === n) s.classList.add('active');
                    if (i + 1 < n) s.classList.add('done');
                });


                if (n === 2) {
                    const val = document.getElementById('email-input').value || 'email kamu';
                    document.getElementById('target-display').textContent = val;
                    startTimer();
                    focusOtp();
                }


                if (n === 4) {
                    document.getElementById('success-email').textContent =
                        document.getElementById('email-input').value || 'kamu';
                }
            }


            function focusOtp() {
                const boxes = document.querySelectorAll('.otp-box');
                boxes.forEach((box, i) => {
                    box.value = '';
                    box.addEventListener('input', () => {
                        if (box.value.length === 1 && i < boxes.length - 1)
                            boxes[i + 1].focus();
                    });
                    box.addEventListener('keydown', (e) => {
                        if (e.key === 'Backspace' && !box.value && i > 0)
                            boxes[i - 1].focus();
                    });
                });
                boxes[0].focus();
            }


            let timerInterval;
            function startTimer() {
                clearInterval(timerInterval);
                let seconds = 120;
                updateTimerDisplay(seconds);
                timerInterval = setInterval(() => {
                    seconds--;
                    updateTimerDisplay(seconds);
                    if (seconds <= 0) clearInterval(timerInterval);
                }, 1000);
            }

            function updateTimerDisplay(s) {
                const m = String(Math.floor(s / 60)).padStart(2, '0');
                const sec = String(s % 60).padStart(2, '0');
                document.getElementById('timer').textContent = m + ':' + sec;
            }

            function resetTimer() { startTimer(); }


            function checkStrength() {
                const pw = document.getElementById('pw1').value;
                const bars = [document.getElementById('s1'), document.getElementById('s2'),
                document.getElementById('s3'), document.getElementById('s4')];
                const label = document.getElementById('strength-text');

                let score = 0;
                if (pw.length >= 8) score++;
                if (/[A-Z]/.test(pw)) score++;
                if (/[0-9]/.test(pw)) score++;
                if (/[^A-Za-z0-9]/.test(pw)) score++;

                const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#C9A84C'];
                const labels = ['Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];

                bars.forEach((b, i) => {
                    b.style.background = i < score ? colors[score - 1] : 'rgba(255,255,255,0.1)';
                });

                label.textContent = score > 0 ? labels[score - 1] : '—';
                label.style.color = score > 0 ? colors[score - 1] : 'rgba(255,255,255,0.4)';
            }


            function togglePw(id, btn) {
                const input = document.getElementById(id);
                if (input.type === 'password') {
                    input.type = 'text';
                    btn.textContent = '🙈';
                } else {
                    input.type = 'password';
                    btn.textContent = '👁';
                }
            }


            function doReset() {
                const pw1 = document.getElementById('pw1').value;
                const pw2 = document.getElementById('pw2').value;
                if (!pw1) { alert('Masukkan password baru.'); return; }
                if (pw1.length < 8) { alert('Password minimal 8 karakter.'); return; }
                if (pw1 !== pw2) { alert('Konfirmasi password tidak cocok.'); return; }
                goStep(4);
            }