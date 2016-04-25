var assert = require('assert'),
	fs = require('fs');

describe('Test SASS Compilation', function(){
	it('should render double escaped unicode characters when not using this module', function() {
		var generatedCSS = fs.readFileSync('test/resources/buildFail.css').toString().replace(/\s/g, ''),
			expectedCss = 'q{quotes:"‘" "’" "\\\\00AB" "\\\\00BB"}'.replace(/\s/g, '');

		assert.equal(expectedCss, generatedCSS.toString());
	});

	it('should NOT render double escaped unicode characters when using this module', function() {
		var generatedCSS = fs.readFileSync('test/resources/buildPass.css').toString().replace(/\s/g, ''),
			expectedCss = 'q{quotes:"‘" "’" "\\00AB" "\\00BB"}'.replace(/\s/g, '');

		assert.equal(expectedCss, generatedCSS.toString());
	});
});