#!/usr/bin/env python3

import argparse, json, sys

class Parser:
	def __init__(self, text):
		self.java = None
		self.javascript = list()
		self.lines = list()

	def parse(self):
		for line in input_text.strip('\r').split('\n'):
			if line.startswith('// Java:'):
				if self.java:

					self._add_line()
					self.javascript = list()
				self.java = line[8:]
			elif self.java:
				self.javascript.append(line)
		else:
			if self.java and self.javascript:
				self._add_line()

	def dump_json(self):
		return json.dumps(self.lines, indent=4, sort_keys=True) + '\n'

	def _add_line(self):
		self.lines.append(dict(Java=self.java, JavaScript=self._make_function()))

	def _make_function(self):
		return '(function(that) {\n  ' + '\n  '.join(self.javascript) + '\n})'

if __name__ == '__main__':
	arg_parser = argparse.ArgumentParser()
	arg_parser.add_argument('input')
	arg_parser.add_argument('output')
	args = arg_parser.parse_args()

	try:
		with open(args.input, 'r') as f:
			input_text = f.read()
	except OSError as e:
		print(e)
		sys.exit(1)

	code_parser = Parser(input_text)
	code_parser.parse()

	try:
		with open(args.output, 'w') as f:
			f.write(code_parser.dump_json())
	except OSError as e:
		print(e)
		sys.exit(1)
