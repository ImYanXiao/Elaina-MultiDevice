import fetch from 'node-fetch'

export const shortUrl = async (url) => {
	return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
}
