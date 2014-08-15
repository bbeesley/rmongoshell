all:
	@npm install

install:
	@npm install
	@mkdir -p "$R_PACKAGE_DIR/node/"
	@cp -R * "$R_PACKAGE_DIR/node/"

clean:
	rm -Rf node_modules

.PHONY: install clean
