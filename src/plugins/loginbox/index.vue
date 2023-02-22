<template>
    <transition name="loginbox" v-if="show">
        <login @after-login="closebox" :showbox="true"></login>
    </transition>
</template>

<script>
	export default {
		name: 'loginbox',
		data() {
			return {
				show: false,
			}
		},
		methods: {
			closebox(){
                window.location.reload();
				this.show = false;
            }
		}
	}
</script>
