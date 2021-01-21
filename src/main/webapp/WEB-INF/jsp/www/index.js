$(function () {
	var $splashLoader = $('splash-loader');
	var $section = $('section');
	var $aliasInput = $('#alias');
	var $aliasButton = $('alias-button');

	$(document).on('deviceready', function () {
		$splashLoader.hide();
		$section.css({ display: 'block' });
		if (typeof navigator !== 'undefined' && typeof navigator['splashscreen'] !== 'undefined') {
			navigator['splashscreen'].hide();
		}

		//NOTE!! we dont lock this package and we dont check for any updates because any update should be a binary change requiring reinstallation
		//reason being we have no where to upload the bundle to since demo, demo-dev and demo-uat all have bundles already. we'll have to add a new deployment
		//oneapp or something if we want to push over the air updates.
	});

	$aliasButton.on('click', function () {
		$aliasButton.html('Working...');
		download($aliasInput.val())
			.catch(function (error) {
				$aliasButton.html('GO');
				alert(error.toString());
			});
	});

	function download(alias) {
		return getDeployment(alias)
			.then(getBase)
			.then(downloadPackage)
			.then(installPackage);
	}

	function getDeployment(target) {
		var parts, customer, environment;

		//added because parseEnvironment was throwing undefined errors when target doesnt contain environment
		if (target.indexOf('-') > -1){
			parts = target.split('-');
			customer = parts[0].toLowerCase();
			environment = parseEnvironmentKeyword(parts[1]);

		}else{
			customer = target;
			environment = "Production";
		}
		var os = bowser.ios ? 'iOS' : bowser.android ? 'Android' : void 0;

		if (!/^(?:Dev|Uat|Production)$/.test(environment)) {
			return Promise.reject('Invalid environment in alias');
		}
		if (!os) {
			return Promise.reject('Invalid OS detected');
		}

		var url = 'https://api.appcenter.ms/v0.1/apps/mumba/' + customer + '-mumba-cloud-' + os + '/deployments/' + environment;
		return new Promise(function (resolve, reject) {
			$.ajax({
				type: 'GET',
				url: url,
				dataType: 'json',
				headers: {
					'X-API-Token': '958337e68636e634c5c681e83c8c74f801623b17'
				},
				success: function (deployments) {
					resolve(deployments)
				},
				error: function (xhr, errorType, error) {
					reject(error);
				}
			});
		});
	}

	//this will install the base pack for the latest version, be sure to check for updates in the bundles we switch to
	function getBase(deployments) {
		return new Promise(function (resolve, reject) {
			if(!deployments){
				reject("No deployments found!")
			}

			//the sole purpose of this app is to switch to another base app so we always start with the base bundle to download and install.
			var result = new RemotePackage();
				result.deploymentKey = deployments.key;
				result.appVersion = deployments.latest_release.target_binary_range;
				result.downloadUrl = deployments.latest_release.blob_url;
				result.label = deployments.latest_release.label;
				result.packageHash = deployments.latest_release.package_hash;
				result.isFirstRun = true;

			resolve(result)
		});
	}

	function downloadPackage(pack) {
		if (!pack) {
			return;
		}
		return new Promise(function (resolve, reject) {
			pack.download(function (remotePackage) {
				resolve(remotePackage);
			}, function (error) {
				reject(error);
			});
		});
	}

	function installPackage(pack) {
		if (!pack) {
			return;
		}
		return new Promise(function (resolve, reject) {
			pack.install(function () {
				resolve();
			}, function (error) {
				reject(error);
			}, { installMode: InstallMode.IMMEDIATE });
		});
	}

	function parseEnvironmentKeyword(environment) {
		return (environment.replace(/(?:development|dev)/i, 'Dev')
				.replace(/uat/i, 'Uat')
				.replace(/(?:production|prod)/i, 'Production')
			|| 'Production').trim();
	}
});
