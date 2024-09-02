document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const notSureBtn = document.getElementById('notSureBtn');
    const cameraContainer = document.getElementById('cameraContainer');
    const video = document.getElementById('video');

    function openCamera() {
        cameraContainer.classList.remove('hidden');
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => {
                console.error('Error accessing the camera:', err);
                alert('Unable to access the camera. Please make sure you have given permission and try again.');
                closeCamera();
            });
    }

    function closeCamera() {
        cameraContainer.classList.add('hidden');
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }
    }

    yesBtn.addEventListener('click', openCamera);
    notSureBtn.addEventListener('click', openCamera);

    // Close camera when clicking outside the video
    cameraContainer.addEventListener('click', (e) => {
        if (e.target === cameraContainer) {
            closeCamera();
        }
    });

    // Ensure camera container is hidden initially
    cameraContainer.classList.add('hidden');
});