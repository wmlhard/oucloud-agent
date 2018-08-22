<template>
	<div>
		<Content>
			<div class="announcement">
				<div class="head-banner">
					<div class="swiper-container">
					    <div class="swiper-wrapper">
					        <div class="swiper-slide" style="background: url(../../static/img/gonggao.png)no-repeat 50% center;">
						        <div class="swiper-content">
						        	<h1>公平交易,加密货币</h1>
						        	<p>以最佳的价格，对换加密货币</p>
						        	<p>以最佳的价格，对换加密货币</p>
						        	<p class="more_link"><a href="">了解更多</a></p>
						        </div>
					        </div>
					        <div class="swiper-slide" style="background: url(../../static/img/gonggao.png)no-repeat 50% center;">
					        	<div class="swiper-content">
						        	<h1>公平交易,加密货币</h1>
						        	<p>以最佳的价格，对换加密货币</p>
						        	<p>以最佳的价格，对换加密货币</p>
						        	<p class="more_link"><a href="">了解更多</a></p>
						        </div>
					        </div>
					        <div class="swiper-slide" style="background: url(../../static/img/gonggao.png)no-repeat 50% center;">
					        	<div class="swiper-content">
						        	<h1>公平交易，加密货币</h1>
						        	<p>以最佳的价格，对换加密货币</p>
						        	<p>以最佳的价格，对换加密货币</p>
						        	<p class="more_link"><a href="">了解更多</a></p>
						        </div>
					        </div>
					    </div>
					    <div class="swiper-pagination"></div>
					</div>
					<div class="notice"><p>公告/NOTICE</p></div>
				</div>
				<div class="notice-content">
					<div class="notice-wrap">
						<div class="notice-padding">
							<div class="exhibition_wrap">
								<div class="icon_img"><span class="icon-circle-line"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span></div>
								<div class="exhibition">
									<div class="exhibition_content">
										<h2>2018中国国际钱币(北京)展销会5月18日开<span>热点</span></h2>
										<p>比特币交易大新闻，币币交易&nbsp;&nbsp;新手攻略比特币交易大新闻，币币交易&nbsp;&nbsp;新手攻略比特币交易大新闻...[详情]</p>
									</div>
									<div class="time">
										<p>2018-5-12</p>
									</div>
								</div>
							</div>
							<div class="exhibition_wrap">
								<div class="icon_img"><span class="icon-circle-line"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span></div>
								<div class="exhibition">
									<div class="exhibition_content">
										<h2 class="">比特币交易?<span>热点</span></h2>
										<p>比特币交易大新闻，币币交易&nbsp;&nbsp;新手攻略比特币交易大新闻，币币交易&nbsp;&nbsp;新手攻略比特币交易大新闻...[详情]</p>
									</div>
									<div class="time">
										<p>2018-5-12</p>
									</div>
								</div>
							</div>
							<div class="exhibition_wrap">
								<div class="icon_img"><span class="icon-circle-line"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span></div>
								<div class="exhibition">
									<div class="exhibition_content">
										<h2>2018中国国际钱币(北京)展销会5月18日开<span>热点</span></h2>
										<p>比特币交易大新闻，币币交易&nbsp;&nbsp;新手攻略比特币交易大新闻，币币交易&nbsp;&nbsp;新手攻略比特币交易大新闻...[详情]</p>
									</div>
									<div class="time">
										<p>2018-5-12</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Content>
	</div>
</template>
<script>
 import '../assets/js/swiper.min.js'
 import '../assets/css/swiper.min.css'
export default{
	data(){
		return{

		}
	},
	methods:{

	},
	mounted(){
	     var mySwiper = new Swiper ('.swiper-container', {
	     	initialSlide :0,
 			pagination: '.swiper-pagination',
 			paginationClickable: true,
 			parallax: true,
	        speed: 600,
	        loop: true,
			autoplay: 2000,
			autoplayDisableOnInteraction: false,
			observer:true,
			observeParents:true
	  	})
	}
}
</script>
<style scoped lang="scss">
.announcement{
	width:100%;
	background:#272c39;
	height: 100%;
	.head-banner{
		width:100%;
		height:600px;
		position:relative;
	}

	.notice{
		position:absolute;
		width:100%;
		height:80px;
		bottom:0;
		background:#171a21;
		text-align:center;
		z-index:99
	}
	.notice p{
		font-size:24px;
		color:#fff;
		text-align:center;
		line-height:80px;
	}
	.notice-content{
		width:100%;
	}
	.notice-wrap{
		width:100%;
		.notice-padding{
			margin:10px;
			background:#171a21;
			@media screen and (min-width: 1200px){
				.exhibition_wrap{
				    width: 1180px!important;
				}
			}
		    .exhibition_wrap{
		    	display: -webkit-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
			    display: flex;
			    width:90%;
			    margin:0 auto;
			    .icon_img{
			    	padding-top:40px;
			    	.icon-circle-line{
						font-size:60px
					}
			    }
			    .exhibition{
					display: -webkit-box;
				    display: -ms-flexbox;
				    display: -webkit-flex;
				    display: flex;
				    -webkit-box-flex: 1;
				    -ms-flex: 1;
				    -webkit-flex: 1;
				    flex: 1;
				    margin-left:40px;
				    padding:40px 0;
				     border-bottom:1px solid #272c39;
				    .exhibition_content{
				        -webkit-box-flex: 1;
					    -ms-flex: 1;
					    -webkit-flex: 1;
					    flex: 1;

					    p{
					    	color:#999;
					    	font-size:14px;
					    	width:614px;
					    	line-height:24px
					    }
					    h2{
					    	color:#fff;
					    	font-size:18px;
					    	font-weight:normal;
					    	line-height:38px;
					    	span{
					    		padding:3px 8px;
					    		border:1px solid #fff;
					    		border-radius:6px;
					    		margin-left:20px;
					    		font-size:12px
					    	}
					    }
					    h2:hover{
					    	color:#f3ba2f;
					    	transition:all .3s ease-in-out;
					    	cursor:pointer;
					    	span{
					    		border:1px solid #f3ba2f;
					    	}
					    }
				    }
				    .time{
				    	color:#ccc;
				    	font-size:14px;
				    }
				}
			}
	    }
	}
	.swiper-container{
		.swiper-wrapper{
			.swiper-slide{
				width: 100%;
				margin: 0 auto;
				height: 600px;
				overflow: hidden;
				background-size:cover;
				z-index:98;
				@media screen and (min-width: 1200px){
					.swiper-content{
					   padding:100px 0 0 0!important
					}
				}
				.swiper-content{
					width:1200px;
					margin:0 auto;
					padding:100px 0 0 40px;
					h1{
					  font-size:50px;
					  color:#eee;
					  font-weight:normal;
					  line-height:100px
					}
					p{
						font-size:18px;
						color:#ccc;
						line-height:38px;
						a{
							font-size:18px;
							color:#ccc;
							padding:5px 10px;
							border:1px solid #ccc;
						}
					}
					.more_link{
						margin-top:50px
					}
				}
			}
		}
		.swiper-pagination{
			bottom:100px;
		}
	}
}

</style>
