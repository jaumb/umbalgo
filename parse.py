#!/usr/bin/env python3

import argparse, json, sys

class Parser:
	def __init__(self, text):
		self.this_line_java = None
		self.this_line_javascript = list()
		self.lines = list()
		for line in input_text.strip('\r').split('\n'):
			if line.startswith('// Java:'):
				if self.this_line_java:
					self._add_line(self.this_line_java, self.this_line_javascript)
				self.this_line_java = line[8:]
			elif self.this_line_java:
				self.this_line_javascript.append(line)
		if self.this_line_java and self.this_line_javascript:
			self.lines.append(dict(Java=self.this_line_java,
								   JavaScript='\n'.join(self.this_line_javascript)))

	def _add_line(self, java, javascript):
		self.lines.append(dict(Java=java, JavaScript='\n'.join(javascript)))
		self.this_line_javascript = list()

	def dump_json(self):
		return json.dumps(self.lines, indent=4, sort_keys=True)

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

	try:
		with open(args.output, 'w') as f:
			f.write(code_parser.dump_json())
	except OSError as e:
		print(e)
		sys.exit(1)
