function toggleNoJobs(tabId, count) {
    const container = document.getElementById(tabId);
    if (!container) return;

    const msg = document.getElementById('empty-message-container');
    if (msg) {
        if (count === 0) {
            msg.classList.remove('hidden');
            container.appendChild(msg); 
        } else {
            msg.classList.add('hidden');
        }
    }
}

function updateCounts() {
    const getJobCount = (id) => {
        const container = document.getElementById(id);
        return container ? container.querySelectorAll('.job-card').length : 0;
    };

    const all = getJobCount('all-job-tab');
    const interview = getJobCount('interview-job-tab');
    const rejected = getJobCount('rejected-job-tab');

    document.getElementById('total-job').innerText = all; 
    document.getElementById('total-interview').innerText = interview;
    document.getElementById('total-rejected').innerText = rejected;

    const activeTab = document.querySelector('section[id$="-tab"]:not(.hidden)');
    const jobTextElement = document.getElementById('job');
    const outOfTextElement = document.getElementById('out-of-job');

    if (activeTab && activeTab.id === 'all-job-tab') {
        jobTextElement.innerText = all;
        outOfTextElement.innerText = "";
    } else if (activeTab) {
        const currentCount = (activeTab.id === 'interview-job-tab') ? interview : rejected;
        jobTextElement.innerText = currentCount;
        outOfTextElement.innerText = `of ${all}`;
    }

    if(activeTab) toggleNoJobs(activeTab.id, (activeTab.id === 'all-job-tab' ? all : (activeTab.id === 'interview-job-tab' ? interview : rejected)));
}
