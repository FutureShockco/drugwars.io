<template>
    <UiCenter class="vue-ui-modal pt-2 pb-7">
        <div class="wrapper">
            <div class="left"></div>
            <div class="right"></div>
        </div>
        <Icon class="logo-large anim-pulse" name="logo" />
    </UiCenter>
</template>


<style lang="less" scoped>
.wrapper {
    width: 130px;
    height: 40px;
    border-radius: 40px;
    box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
    transform: rotate(-35deg);
    cursor: pointer;
    animation: bgmove 5s infinite linear;
    left: calc(50% - 65px);
    top: calc(50% - 20px);
    position: absolute;
}

.wrapper:hover {
    transform: rotate(35deg);
}

.wrapper:after {
    clear: both;
    display: table;
    content: "";
}

.wrapper:before {
    content: "";
    display: block;
    position: absolute;
    border-radius: 30px;
    width: 80%;
    height: 30%;
    background: linear-gradient(25deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3));
    left: 50%;
    margin-left: -40%;
    top: 18%;
}

.left {
    float: left;
    height: 100%;
    width: 50%;
    background: linear-gradient(#ffc012, #facc02);
    border-radius: 40px 0 0 40px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-right: 1px solid #ffc400;
    box-shadow: inset 0 5px 0 #ffc400, inset 0 -10px 15px #facc02;
}

.right {
    float: right;
    height: 100%;
    width: 50%;
    border-radius: 0 40px 40px 0;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-left: 1px solid rgba(0, 0, 0, 0.6);
    box-shadow: inset 0 5px 0 #ff1212, inset 0 -10px 15px #fa0202;
    background: linear-gradient(#ff1212, #fa0202);
}

@keyframes bgmove {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>