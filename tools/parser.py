#!/usr/bin/env python3

import argparse
import json
import sys

class Parser:
	def __init__(self, text):
		self._code = None
		self._note = None
		self._impl = []
		self._lines = []

	def parse(self):
		for line in input_text.strip('\r').split('\n'):
			if line.startswith('// Code:'):
				if self._code:
					self._add_line()
					self._note = None
					self._impl = []
				self._code = line[8:]
			elif self._code and line.startswith('// Note:'):
				self._note = '(function(that) { return ' + line[8:] + '; })'
			elif self._code:
				self._impl.append(line)
		else:
			if self._code and self._impl:
				self._add_line()

	def dump_json(self):
		return json.dumps(self._lines, indent=2, sort_keys=True) + '\n'

	def _add_line(self):
		line = { 'code': self._code, 'impl': self._make_function() }
		if self._note:
			line['note'] = self._note
		self._lines.append(line)

	def _make_function(self):
		return '(function(that) {\n  ' + '\n  '.join(self._impl) + '\n})'

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
