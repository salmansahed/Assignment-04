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


function handleAction(button, status) {
    const card = button.closest('.job-card'); 
    if (!card) return;

    const jobId = card.getAttribute('data-job-id'); 
    const allTabCard = document.querySelector(`#all-job-tab [data-job-id="${jobId}"]`);
    
    const updateStyle = (targetCard, type) => {
        const statusBtn = targetCard.querySelector('.not-applied-btn');
        
        targetCard.classList.remove('border-l-[6px]', 'border-green-500', 'border-red-500', 'border-2');
        statusBtn.classList.remove('bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700', 'bg-[#eef4ff]', 'text-[#002C5C]');

        if (type === 'interview') {
            statusBtn.innerText = 'Interview';
            targetCard.classList.add('border-l-[6px]', 'border-green-500');
            statusBtn.classList.add('bg-green-100', 'text-green-700');
        } else if (type === 'rejected') {
            statusBtn.innerText = 'Rejected';
            targetCard.classList.add('border-l-[6px]', 'border-red-500');
            statusBtn.classList.add('bg-red-100', 'text-red-700');
        } else {
            statusBtn.innerText = 'Not Applied';
            statusBtn.classList.add('bg-[#eef4ff]', 'text-[#002C5C]');
        }
    };

    if (allTabCard) updateStyle(allTabCard, status);

    const existingClone = document.querySelector(`.clone[data-job-id="${jobId}"]`);
    if (existingClone) existingClone.remove();

    const clonedCard = allTabCard.cloneNode(true);
    clonedCard.classList.add('clone');
    
    clonedCard.querySelector('.delete-icon').onclick = () => {
        if (allTabCard) updateStyle(allTabCard, 'reset');
        clonedCard.remove();
        updateCounts();
    };

    const targetTabId = status === 'interview' ? 'interview-job-tab' : 'rejected-job-tab';
    document.getElementById(targetTabId).prepend(clonedCard);
    
    setupButtons(clonedCard);
    updateCounts();
}