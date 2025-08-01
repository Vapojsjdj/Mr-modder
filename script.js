document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const articlePage = document.getElementById("articlePage");
    const overlayInterstitial = document.getElementById("overlayInterstitial");
    const closeBtn = document.getElementById("closeBtn");
    const skipBtn = document.getElementById("skipBtn");
    const bottomSkipBtn = document.getElementById("bottomSkipBtn");
    const finalDownloadSection = document.getElementById("finalDownloadSection");
    const finalDownloadLink = document.getElementById("finalDownloadLink");
    const overlayAdTop = document.getElementById("overlayAdTop");
    const overlayAdBottom = document.getElementById("overlayAdBottom");
    const overlayAdOverlayTop = document.getElementById("overlayAdOverlayTop");
    const overlayAdOverlayBottom = document.getElementById("overlayAdOverlayBottom");
    const overlayTimer = document.getElementById("overlayTimer");
    const overlayProgressBar = document.getElementById("overlayProgressBar");
    const overlayProgressFill = document.getElementById("overlayProgressFill");
    const overlayCompleteText = document.getElementById("overlayCompleteText");
    
    // Article countdown elements
    const articleCountdownSection = document.getElementById("articleCountdownSection");
    const articleCountdownTimer = document.getElementById("articleCountdownTimer");
    const articleCountdownFill = document.getElementById("articleCountdownFill");
    const scrollDownBtn = document.getElementById("scrollDownBtn");
    
    // Other elements
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const finalDownloadBtn = document.getElementById("finalDownloadBtn");

    // State variables
    let overlayTimer_count = 15;
    let articleTimer_count = 15;
    let overlayInterval;
    let articleInterval;
    let adInteractionStarted = false;
    let cycleCount = 0;
    let maxCycles = 4;

    // Ad configurations
    const adConfigs = {
        top: {
            key: '95f57fba20c3d82aa14c1c7298a2448a',
            format: 'iframe',
            scriptUrl: '//www.highperformanceformat.com/95f57fba20c3d82aa14c1c7298a2448a/invoke.js',
            width: '250px',
            height: '200px'
        },
        bottom: {
            key: '3e44032d19aa3067bf8c36b5bd413219',
            format: 'iframe',
            scriptUrl: '//www.highperformanceformat.com/3e44032d19aa3067bf8c36b5bd413219/invoke.js',
            width: '250px',
            height: '200px'
        },
        article1: {
            scriptUrl: '//pl25597765.profitableratecpm.com/1a63ad3113c91a2dcc42c7b55b6fd2db/invoke.js',
            containerId: 'container-article-1',
            width: '300px',
            height: '250px'
        },
        article2: {
            key: '95f57fba20c3d82aa14c1c7298a2448a',
            format: 'iframe',
            scriptUrl: '//www.highperformanceformat.com/95f57fba20c3d82aa14c1c7298a2448a/invoke.js',
            width: '300px',
            height: '250px'
        },
        article3: {
            key: '3e44032d19aa3067bf8c36b5bd413219',
            format: 'iframe',
            scriptUrl: '//www.highperformanceformat.com/3e44032d19aa3067bf8c36b5bd413219/invoke.js',
            width: '300px',
            height: '250px'
        }
    };

    // Load ad function
    function loadAd(targetElement, adConfig) {
        if (!targetElement || !adConfig) return;

        targetElement.innerHTML = '';
        
        if (adConfig.key && adConfig.format && adConfig.scriptUrl) {
            targetElement.style.width = adConfig.width;
            targetElement.style.height = adConfig.height;
            
            window.atOptions = {
                'key': adConfig.key,
                'format': adConfig.format,
                'height': parseInt(adConfig.height),
                'width': parseInt(adConfig.width),
                'params': {}
            };
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = adConfig.scriptUrl;
            targetElement.appendChild(script);
        } else if (adConfig.scriptUrl && adConfig.containerId) {
            const script = document.createElement('script');
            script.async = true;
            script.setAttribute('data-cfasync', 'false');
            script.src = adConfig.scriptUrl;

            const containerDiv = document.createElement('div');
            containerDiv.id = adConfig.containerId;
            
            targetElement.appendChild(containerDiv);
            targetElement.appendChild(script);
        }
    }

    // Initialize overlay ads
    function initializeOverlay() {
        loadAd(overlayAdTop, adConfigs.top);
        loadAd(overlayAdBottom, adConfigs.bottom);
        
        // Setup interaction listeners
        setupOverlayInteractionListeners();
    }

    // Setup overlay interaction listeners
    function setupOverlayInteractionListeners() {
        window.addEventListener('blur', handleOverlayInteraction);
        overlayAdOverlayTop.addEventListener('click', handleOverlayInteraction);
        overlayAdOverlayBottom.addEventListener('click', handleOverlayInteraction);
    }

    // Handle overlay ad interaction
    function handleOverlayInteraction() {
        if (!adInteractionStarted) {
            adInteractionStarted = true;
            startOverlayTimer();
            
            // Remove overlays
            overlayAdOverlayTop.style.display = 'none';
            overlayAdOverlayBottom.style.display = 'none';
            
            // Remove listeners
            window.removeEventListener('blur', handleOverlayInteraction);
            overlayAdOverlayTop.removeEventListener('click', handleOverlayInteraction);
            overlayAdOverlayBottom.removeEventListener('click', handleOverlayInteraction);
        }
    }

    // Start overlay timer
    function startOverlayTimer() {
        overlayTimer.style.display = 'block';
        overlayProgressBar.style.display = 'block';
        
        overlayInterval = setInterval(() => {
            overlayTimer_count--;
            overlayTimer.textContent = overlayTimer_count;
            
            const progress = ((15 - overlayTimer_count) / 15) * 100;
            overlayProgressFill.style.width = progress + '%';
            
            if (overlayTimer_count <= 0) {
                clearInterval(overlayInterval);
                hideOverlay(); // Automatically hide the overlay when timer finishes
            }
        }, 1000);
    }

    // Hide overlay and show article countdown
    function hideOverlay() {
        // Allow hiding only if timer is complete or not started yet (e.g., initial state)
        if (overlayTimer_count <= 0 || !adInteractionStarted) {
            overlayInterstitial.style.display = 'none';
            if (cycleCount < maxCycles) {
                showArticleCountdown();
            }
        }
    }

    // Show article countdown
    function showArticleCountdown() {
        articleCountdownSection.style.display = 'block';
        articleTimer_count = 15;
        
        articleInterval = setInterval(() => {
            articleTimer_count--;
            articleCountdownTimer.textContent = articleTimer_count;
            
            const progress = ((15 - articleTimer_count) / 15) * 100;
            articleCountdownFill.style.width = progress + '%';
            
            if (articleTimer_count <= 0) {
                clearInterval(articleInterval);
                articleCountdownTimer.style.display = 'none';
                document.querySelector('.countdown-text').textContent = 'Ready to continue!';
                scrollDownBtn.style.display = 'inline-block'; // Show button only when timer completes
            }
        }, 1000);
    }

    // Load article ads
    function loadArticleAds() {
        const articleAd1 = document.getElementById('articleAd1');
        const articleAd2 = document.getElementById('articleAd2');
        const articleAd3 = document.getElementById('articleAd3');
        
        if (articleAd1) loadAd(articleAd1, adConfigs.article1);
        if (articleAd2) loadAd(articleAd2, adConfigs.article2);
        if (articleAd3) loadAd(articleAd3, adConfigs.article3);
    }

    // Show overlay cycle
    function showOverlayCycle() {
        if (cycleCount >= maxCycles) {
            // Show final download section
            finalDownloadSection.style.display = 'block';
            return;
        }
        
        cycleCount++;
        overlayInterstitial.style.display = 'flex';
        adInteractionStarted = false;
        overlayTimer_count = 15;
        
        // Reset overlay elements
        overlayTimer.style.display = 'none';
        overlayProgressBar.style.display = 'none';
        overlayProgressFill.style.width = '0%';
        overlayAdOverlayTop.style.display = 'block';
        overlayAdOverlayBottom.style.display = 'block';
        
        // Hide close/skip buttons until timer is done (or interaction starts timer)
        closeBtn.style.pointerEvents = 'none';
        closeBtn.style.opacity = '0.5';
        skipBtn.style.display = 'none'; // Keep skip button hidden for this flow
        
        // Hide article countdown and bottom skip button
        articleCountdownSection.style.display = 'none';
        bottomSkipBtn.style.display = 'none';
        
        initializeOverlay();
    }

    // Event listeners
    closeBtn.onclick = hideOverlay;
    skipBtn.onclick = hideOverlay;
    
    scrollDownBtn.onclick = () => {
        const firstSection = document.querySelector('.article-section');
        if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth' });
        }
        articleCountdownSection.style.display = 'none';
    };
    
    finalDownloadBtn.onclick = () => {
        alert('Thank you for reading! Complete article downloaded successfully. 📄✨');
    };

    // Bottom skip button event
    bottomSkipBtn.onclick = () => {
        showOverlayCycle();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Final download link event
    finalDownloadLink.onclick = (e) => {
        e.preventDefault();
        alert('🎉 Thank you for completing all sections! Your complete guide has been downloaded successfully.');
        finalDownloadSection.style.display = 'none';
    };

    // Scroll to top functionality
    window.onscroll = () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollTopBtn.style.display = "flex";
            scrollTopBtn.style.opacity = "1";
        } else {
            scrollTopBtn.style.opacity = "0";
            setTimeout(() => { 
                if (scrollTopBtn.style.opacity === "0") {
                    scrollTopBtn.style.display = "none";
                }
            }, 300);
        }
        
        // Check for bottom scroll
        checkScrollBottom();
    };

    scrollTopBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Check if user scrolled to bottom
    function checkScrollBottom() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollTop + windowHeight >= documentHeight - 100) {
            if (cycleCount < maxCycles && overlayInterstitial.style.display === 'none') {
                bottomSkipBtn.style.display = 'block';
            }
        } else {
            bottomSkipBtn.style.display = 'none';
        }
    }

    // Initialize - start with first overlay
    showOverlayCycle();
    loadArticleAds();
});