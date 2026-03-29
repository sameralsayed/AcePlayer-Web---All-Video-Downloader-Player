// script.js
let isLooping = false;
let sleepTimeout = null;

function launchAcePlayer() {
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        new bootstrap.Tab(document.querySelector('#demoTabs a')).show();
    }, 800);
}

function togglePopup() {
    const modal = new bootstrap.Modal(document.getElementById('popupModal'));
    const popupVideo = document.getElementById('popupVideo');
    const mainVideo = document.getElementById('mainPlayer');
    
    popupVideo.currentTime = mainVideo.currentTime;
    popupVideo.play();
    modal.show();
    
    modal._element.addEventListener('hidden.bs.modal', () => {
        popupVideo.pause();
    }, { once: true });
}

function toggleLoop() {
    const video = document.getElementById('mainPlayer');
    isLooping = !isLooping;
    video.loop = isLooping;
    alert(isLooping ? '🔁 Loop mode ENABLED' : '🔁 Loop mode DISABLED');
}

function setABRepeat() {
    alert('🎬 A-B Repeat activated!\nSet start and end points on the video timeline (demo simulation)');
}

function startSleepTimer() {
    if (sleepTimeout) clearTimeout(sleepTimeout);
    const minutes = parseInt(document.getElementById('sleepTimer').value) || 15;
    const video = document.getElementById('mainPlayer');
    
    sleepTimeout = setTimeout(() => {
        video.pause();
        alert('⏰ Sleep timer finished – playback stopped!');
    }, minutes * 60000);
    
    alert(`🌙 Sleep timer set for ${minutes} minutes`);
}

function startDownload() {
    const url = document.getElementById('urlInput').value.trim();
    if (!url) return alert('Please enter a valid video URL');
    
    const container = document.getElementById('downloadProgressContainer');
    const progressBar = document.getElementById('downloadProgress');
    const status = document.getElementById('downloadStatus');
    const complete = document.getElementById('downloadComplete');
    
    container.classList.remove('d-none');
    complete.classList.add('d-none');
    progressBar.style.width = '0%';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${Math.floor(progress)}%`;
        progressBar.textContent = `${Math.floor(progress)}%`;
        status.textContent = `Downloading ${url.split('/').pop()} • Background mode active`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                container.classList.add('d-none');
                complete.classList.remove('d-none');
                
                // Fake download complete toast
                const toastHTML = `<div class="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3" role="alert"><div class="d-flex"><div class="toast-body">🎉 Video saved to Downloads folder!</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div>`;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = toastHTML;
                document.body.appendChild(tempDiv.firstElementChild);
                new bootstrap.Toast(document.querySelector('.toast')).show();
                
                setTimeout(() => document.querySelector('.toast').remove(), 4000);
            }, 600);
        }
    }, 180);
}

function unlockVault() {
    const pass = document.getElementById('vaultPass').value;
    if (pass === '1234') {
        document.getElementById('vaultContent').classList.remove('d-none');
        renderVaultVideos();
    } else {
        alert('❌ Wrong PIN! (Demo PIN is 1234)');
    }
}

const vaultFakeVideos = [
    { title: "private_memory_1.mp4", thumb: "https://picsum.photos/id/1015/300/170" },
    { title: "private_memory_2.mov", thumb: "https://picsum.photos/id/1005/300/170" },
    { title: "family_moment.mp4", thumb: "https://picsum.photos/id/1016/300/170" }
];

function renderVaultVideos() {
    const container = document.getElementById('vaultVideos');
    container.innerHTML = vaultFakeVideos.map((v, i) => `
        <div class="col-6 col-md-4">
            <div class="position-relative rounded-3 overflow-hidden shadow-sm" onclick="playVaultVideo(${i})">
                <img src="${v.thumb}" class="w-100" alt="${v.title}">
                <div class="position-absolute top-50 start-50 translate-middle text-white">
                    <i class="fas fa-play-circle fa-3x"></i>
                </div>
                <div class="position-absolute bottom-0 start-0 bg-dark bg-opacity-75 text-white w-100 text-center py-1 small">${v.title}</div>
            </div>
        </div>
    `).join('');
}

function playVaultVideo(index) {
    const video = document.getElementById('mainPlayer');
    video.src = "https://test-streams.mux.dev/x264_720p.mp4";
    video.play();
    new bootstrap.Tab(document.querySelector('#demoTabs a[href="#playerTab"]')).show();
    alert('🔓 Playing from Private Vault!');
}

// Auto-play hero video on load
window.onload = function() {
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) heroVideo.play().catch(() => {});
    
    console.log('%c🚀 AcePlayer Web loaded – Full video downloader & player simulation ready!', 'color:#ff0033; font-size:14px; font-weight:bold;');
};
