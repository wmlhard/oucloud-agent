<template>
	<div class="mypromotion">
		<div class="content">
			<people-number></people-number>
			<money></money>
			<dynamic-data></dynamic-data>
			<rule></rule>
		</div>
	</div>
</template>

<script>
import PeopleNumber from './components/PeopleNumber.vue'
import Money from './components/Money.vue'
import DynamicData from './components/DynamicData.vue'
import Rule from './components/Rule.vue'
	export default{
		name: 'MyPromotion',
		components: {
			PeopleNumber,
			Money,
			DynamicData,
			Rule
		}
	};
</script>

