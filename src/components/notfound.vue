<template>
	<div id="NotFoundcontainer">
		<h2>404 NOT FOUND</h2>
		<img src="/Hare_chibi.webp" alt="harePic" />
		<p>Website not available</p>
	</div>
</template>

<style scoped>
	#NotFoundcontainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgb(27, 27, 27);
		border-radius: 20px;
		margin: auto;
		margin-top: 60px;
		width: max-content;
		padding: 40px;
	}

	#NotFoundcontainer > h2 {
		font-size: 2.8em;
	}

	#NotFoundcontainer > img {
		height: 360px;
		background-color: rgb(46, 46, 46);
		margin: 10px;
		border-radius: 10px;
	}

	#NotFoundcontainer > p {
		font-size: 1.4em;
	}
</style>
