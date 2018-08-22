<template>
	<div class="dynamicdata">
		<div class="header">
			<p class="title">动态数据</p>
			<router-link to="/MoreRecord" tag="button">更多记录</router-link>
		</div>
		<div class="items">
			<div class="item">
				<span class="icon-add-member"></span>
				<p class="name">近七天新增会员数</p>
				<p class="desc">1000 人</p>
			</div>
			<div class="item">
				<span class="icon-membership"></span>
				<p class="name">近七天激活会员数</p>
				<p class="desc">1000 人</p>
			</div>
			<div class="item">
				<span class="icon-seven"></span>
				<p class="name">近七天返佣额度</p>
				<p class="desc">1000 KT</p>
			</div>
			<div class="item">
				<span class="icon-commission"></span>
				<p class="name">近30天返佣额度</p>
				<p class="desc">1000 KT</p>
			</div>
		</div>


	</div>
</template>

<script>
	export default{
		name: 'DynamicData'
	};
</script>

