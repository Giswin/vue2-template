<template>
    <div :class="wrapClasses">
        <div :class="outerClasses">
            <div :class="innerClasses">
                <div :class="bgClasses" :style="bgStyle">
                    <div class="ivu-progress-inner-text" v-if="textInside">{{ percent }}%</div>
                </div>
                <div :class="successBgClasses" :style="successBgStyle"></div>
            </div>
        </div>
        <span v-if="!hideInfo && !textInside" :class="textClasses">
            <slot>
                <span v-if="isStatus" :class="textInnerClasses">
                    <syIcon :type="statusIcon"></syIcon>
                </span>
                <span v-else :class="textInnerClasses">
                    {{ percent }}%
                </span>
            </slot>
        </span>
    </div>
</template>
<script>
import syIcon from "@/components/general/sy-icon/sy-icon.vue";

function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

const prefixCls = "ivu-progress";

export default {
    name: "syProgress",
    components: { syIcon },
    props: {
        percent: {
            type: Number,
            default: 0,
        },
        successPercent: {
            type: Number,
            default: 0,
        },
        status: {
            validator(value) {
                return oneOf(value, ["normal", "active", "wrong", "success"]);
            },
            default: "normal",
        },
        hideInfo: {
            type: Boolean,
            default: false,
        },
        strokeWidth: {
            type: Number,
            default: 10,
        },
        vertical: {
            type: Boolean,
            default: false,
        },
        strokeColor: {
            type: [String, Array],
        },
        textInside: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentStatus: this.status,
        };
    },
    computed: {
        isStatus() {
            return (
                this.currentStatus == "wrong" || this.currentStatus == "success"
            );
        },
        statusIcon() {
            let type = "";
            switch (this.currentStatus) {
                case "wrong":
                    type = "ios-close-circle";
                    break;
                case "success":
                    type = "ios-checkmark-circle";
                    break;
            }

            return type;
        },
        bgStyle() {
            const style = this.vertical
                ? {
                      height: `${this.percent}%`,
                      width: `${this.strokeWidth}px`,
                  }
                : {
                      width: `${this.percent}%`,
                      height: `${this.strokeWidth}px`,
                  };

            if (this.strokeColor) {
                if (typeof this.strokeColor === "string") {
                    style["background-color"] = this.strokeColor;
                } else {
                    style[
                        "background-image"
                    ] = `linear-gradient(to right, ${this.strokeColor[0]} 0%, ${this.strokeColor[1]} 100%)`;
                }
            }

            return style;
        },
        successBgStyle() {
            return this.vertical
                ? {
                      height: `${this.successPercent}%`,
                      width: `${this.strokeWidth}px`,
                  }
                : {
                      width: `${this.successPercent}%`,
                      height: `${this.strokeWidth}px`,
                  };
        },
        wrapClasses() {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.currentStatus}`,
                {
                    [`${prefixCls}-show-info`]:
                        !this.hideInfo && !this.textInside,
                    [`${prefixCls}-vertical`]: this.vertical,
                },
            ];
        },
        textClasses() {
            return `${prefixCls}-text`;
        },
        textInnerClasses() {
            return `${prefixCls}-text-inner`;
        },
        outerClasses() {
            return `${prefixCls}-outer`;
        },
        innerClasses() {
            return `${prefixCls}-inner`;
        },
        bgClasses() {
            return `${prefixCls}-bg`;
        },
        successBgClasses() {
            return `${prefixCls}-success-bg`;
        },
    },
    created() {
        this.handleStatus();
    },
    methods: {
        handleStatus(isDown) {
            if (isDown) {
                this.currentStatus = "normal";
                this.$emit("on-status-change", this.currentStatus);
            } else {
                if (parseInt(this.percent, 10) == 100) {
                    this.currentStatus = "success";
                    this.$emit("on-status-change", this.currentStatus);
                }
            }
        },
    },
    watch: {
        percent(val, oldVal) {
            if (val < oldVal) {
                this.handleStatus(true);
            } else {
                this.handleStatus();
            }
        },
        status(val) {
            this.currentStatus = val;
        },
    },
};
</script>

<style>
.ivu-progress {
    display: inline-block;
    width: 100%;
    font-size: 12px;
    position: relative;
}

.ivu-progress-vertical {
    height: 100%;
    width: auto;
}

.ivu-progress-outer {
    display: inline-block;
    width: 100%;
    margin-right: 0;
    padding-right: 0;
}

.ivu-progress-show-info .ivu-progress-outer {
    padding-right: 55px;
    margin-right: -55px;
}

.ivu-progress-vertical .ivu-progress-outer {
    height: 100%;
    width: auto;
}

.ivu-progress-inner {
    display: inline-block;
    width: 100%;
    background-color: #f3f3f3;
    border-radius: 100px;
    vertical-align: middle;
    position: relative;
}

.ivu-progress-inner-text {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-size: 12px;
    margin: 0 6px;
}

.ivu-progress-vertical .ivu-progress-inner {
    height: 100%;
    width: auto;
}

.ivu-progress-vertical .ivu-progress-inner:after,
.ivu-progress-vertical .ivu-progress-inner > * {
    display: inline-block;
    vertical-align: bottom;
}

.ivu-progress-vertical .ivu-progress-inner:after {
    content: "";
    height: 100%;
}

.ivu-progress-bg {
    text-align: right;
    border-radius: 100px;
    background-color: #2d8cf0;
    transition: all 0.2s linear;
    position: relative;
}

.ivu-progress-bg:after {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}

.ivu-progress-success-bg {
    border-radius: 100px;
    background-color: #19be6b;
    transition: all 0.2s linear;
    position: absolute;
    top: 0;
    left: 0;
}

.ivu-progress-text {
    display: inline-block;
    margin-left: 5px;
    text-align: left;
    font-size: 1em;
    vertical-align: middle;
    color: #808695;
}

.ivu-progress-active .ivu-progress-bg:before {
    content: "";
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    border-radius: 10px;
    animation: ivu-progress-active 2s ease-in-out infinite;
}

.ivu-progress-vertical.ivu-progress-active .ivu-progress-bg:before {
    top: auto;
    animation: ivu-progress-active-vertical 2s ease-in-out infinite;
}

.ivu-progress-wrong .ivu-progress-bg {
    background-color: #ed4014;
}

.ivu-progress-wrong .ivu-progress-text {
    color: #ed4014;
}

.ivu-progress-success .ivu-progress-bg {
    background-color: #19be6b;
}

.ivu-progress-success .ivu-progress-text {
    color: #19be6b;
}

@keyframes ivu-progress-active {
    0% {
        opacity: 0.3;
        width: 0;
    }

    100% {
        opacity: 0;
        width: 100%;
    }
}

@keyframes ivu-progress-active-vertical {
    0% {
        opacity: 0.3;
        height: 0;
    }

    100% {
        opacity: 0;
        height: 100%;
    }
}
</style>
