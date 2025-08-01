// Main application script
import { config } from './config.js';
import { YouTubeChatMonitor } from './chat-monitor.js';
import { ChatUtils } from './utils.js';
import { ChatUtilities } from './chat-utilities.js';
import { DownloadHandler } from './download-handler.js';

document.addEventListener('DOMContentLoaded', () => {
    // Set file information from config
    document.getElementById('file-name').textContent = config.FILE_NAME;
    document.getElementById('file-size').textContent = config.FILE_SIZE;
    
    // Initialize download handler
    const downloadHandler = new DownloadHandler();
    window.downloadHandler = downloadHandler; // Make it available globally
    
    // Adjust page content to avoid scrolling
    adjustPageLayout();
    
    // Initial download button click handler
    document.getElementById('main-download-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('initial-download-container').style.display = 'none';
        document.getElementById('verification-container').style.display = 'block';
        
        // Initialize the monitor
        const chatMonitor = new YouTubeChatMonitor();
        
        // When a user has been verified, the chat monitor will call:
        // window.downloadHandler.showVerificationSuccess(username, keyword);
    });
    
    // Subscribe button click handler
    document.getElementById('subscribe-button').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show subscription verification progress
        const subscribeStep = document.querySelector('.step:nth-child(1)');
        const subscriptionProgress = document.createElement('div');
        subscriptionProgress.className = 'subscription-progress';
        subscriptionProgress.innerHTML = '<div class="subscription-bar"></div>';
        subscribeStep.appendChild(subscriptionProgress);
        
        subscriptionProgress.style.display = 'block';
        
        // Start progress animation
        setTimeout(() => {
            subscriptionProgress.querySelector('.subscription-bar').style.width = '100%';
        }, 100);
        
        // Simulate verification completion after 3 seconds
        setTimeout(() => {
            // Mark step as completed
            subscribeStep.classList.add('completed');
            
            // Add checkmark to the step
            const stepContent = subscribeStep.querySelector('div');
            const checkmark = document.createElement('span');
            checkmark.className = 'step-checkmark';
            checkmark.innerHTML = '<i class="fas fa-check-circle"></i>';
            subscribeStep.appendChild(checkmark);
            
            // Remove progress bar
            setTimeout(() => {
                subscriptionProgress.style.display = 'none';
                
                // Show chat button
                document.querySelector('.chat-button-container').style.display = 'block';
                
                // Show toast notification
                ChatUtilities.showToast('Subscription verified successfully!');
            }, 500);
        }, 3000);
        
        // Open YouTube channel in new tab
        window.open(this.href, '_blank');
    });
    
    // Copy keyword button
    document.getElementById('copy-keyword').addEventListener('click', function() {
        const keyword = document.getElementById('keyword-display').textContent;
        navigator.clipboard.writeText(keyword).then(() => {
            // Show copied notification
            const oldText = this.innerHTML;
            
            ChatUtils.updateBilingualElement(this, 
                '<i class="fas fa-check"></i> Copied!', 
                '<i class="fas fa-check"></i> تم النسخ!');
                
            setTimeout(() => {
                this.innerHTML = oldText;
            }, 2000);
        });
    });
    
    // Chat button click handler
    document.getElementById('chat-button').addEventListener('click', function() {
        // Mark chat step as completed
        const chatStep = document.querySelector('.step:nth-child(2)');
        chatStep.classList.add('completed');
        
        // Add checkmark to the step
        const checkmark = document.createElement('span');
        checkmark.className = 'step-checkmark';
        checkmark.innerHTML = '<i class="fas fa-check-circle"></i>';
        chatStep.appendChild(checkmark);
    });
    
    // Function to adjust page layout
    function adjustPageLayout() {
        // Reduce padding and margins to make content fit without scrolling
        const container = document.querySelector('.container');
        if (window.innerHeight < 800) {
            container.style.padding = '10px';
            container.style.marginTop = '10px';
            container.style.marginBottom = '10px';
        }
        
        // Limit chat container height
        // This is no longer necessary as chat container is hidden, but keeping the function for other potential layout adjustments.
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.style.maxHeight = '200px';
        }
    }
});