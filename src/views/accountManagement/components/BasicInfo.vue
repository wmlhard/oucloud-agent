<template>
	<div class="basicInformation">
		<div class="basicInformationPadding">
			<p class="title">基本信息</p>
			<ul class="basicInformationContent">
				<li class="InformationContentDan">
					<div class="informationTitle">账号:</div>
					<div class="informationContent">{{info.email}}</div>
				</li>
				<li class="InformationContentDan">
					<div class="informationTitle">昵称:</div>
					<div class="informationContent">{{info.name}}</div>
				</li>
				<li class="InformationContentDan">
					<div class="informationTitle">账号注册时间</div>
					<div class="informationContent">{{info.create_time}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'BasicInfo',
    props:{
		  info: Object
    }
	};
</script>

