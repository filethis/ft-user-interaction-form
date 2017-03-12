# Some simple targets that do useful things

build:
	polymer build

push:
	git push origin

pull:
	git pull origin

register:
	bower register ft-user-interaction-form git://github.com/filethis/ft-user-interaction-form.git

serve:
	polymer serve --port 3000

test:
	polymer test

test-interactive:
	polymer serve --port 3000 && open localhost:3000/components/fst-user-interaction-form/test/ft-user-interaction-form_test.html
