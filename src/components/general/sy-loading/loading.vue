<template>
    <div>
        <div class="loading_wrap">
            <div class="loading">
                <div></div>
                <div></div>
                <div class="loading_title">loading...</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.loading_wrap {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 99999;
    width: 100%;
    height: 100%;
}
.loading,
.loading > div {
    box-sizing: border-box;
}

.loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
}

.loading > div {
    display: inline-block;
    float: none;
}

.loading > div:nth-child(1),
.loading > div:nth-child(2) {
    width: 100%;
}

.loading > div:nth-child(1) {
    top: -25%;
    height: 100%;
    border-radius: 10%;
    background-color: rgba(255, 192, 203, 0.8);
    border: 0 solid rgba(255, 192, 203, 0.8);
    animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
}

.loading > div:nth-child(2) {
    bottom: -9%;
    height: 10%;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    opacity: 0.2;
    animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
}
.loading_title {
    font-size: 18px;
    font-weight: 600;
    margin: 5px 0 0 -10px;
}

@keyframes square-jelly-box-animate {
    17% {
        border-bottom-right-radius: 10%;
    }

    25% {
        transform: translateY(25%) rotate(22.5deg);
    }

    50% {
        border-bottom-right-radius: 100%;
        transform: translateY(50%) scale(1, 0.9) rotate(45deg);
    }

    75% {
        transform: translateY(25%) rotate(67.5deg);
    }

    100% {
        transform: translateY(0) rotate(90deg);
    }
}

@keyframes square-jelly-box-shadow {
    50% {
        transform: scale(1.25, 1);
    }
}
</style>