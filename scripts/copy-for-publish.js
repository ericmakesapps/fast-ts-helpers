const { promises: fs } = require(`fs`)
const root = require(`app-root-path`).path

async function run() {
	const folder = process.argv[2] || `lib`
	const dir = `${root}/${folder}`

	await fs.mkdir(dir, { recursive: true })

	return Promise.all([
		fs
			.readFile(`${root}/package.json`)
			.then((data) => JSON.parse(data.toString()))
			.then((json) => {
				delete json.private
				delete json.scripts
				delete json.devDependencies

				if (json.main) {
					json.main = json.main.replace(`${folder}/`, ``)
				}

				if (json.types) {
					json.types = json.types.replace(`${folder}/`, ``)
				}

				return fs.writeFile(`${dir}/package.json`, JSON.stringify(json, undefined, `\t`))
			}),
		fs
			.readFile(`${root}/package-lock.json`)
			.then((data) => JSON.parse(data.toString()))
			.then((lock) => {
				for (const [name, details] of Object.entries(lock.dependencies)) {
					if (details.dev) {
						delete lock.dependencies[name]
					}
				}

				return fs.writeFile(
					`${dir}/package-lock.json`,
					JSON.stringify(lock, undefined, `\t`)
				)
			})
	])
}

module.exports = run()
