"""Regression checks for section-mode validation: python scripts/test_section_lint.py."""
from copy import deepcopy
import unittest
from lint_questions import check_sections


class SectionLintTests(unittest.TestCase):
    def setUp(self):
        self.section = {
            'id': 'practice', 'mode': 'questions-only',
            'conceptQuiz': [{'id': str(i), 'options': [
                {'text': 'A', 'feedback': 'A describes the boundary.'},
                {'text': 'B', 'feedback': 'B describes transport.'},
            ], 'correct': 0} for i in range(6)],
        }

    def check_section(self, section=None):
        return check_sections({'sections': [section or self.section]}, {}, 'test/L00')

    def test_six_questions_allowed_only_in_questions_mode(self):
        self.assertEqual(self.check_section(), [])
        ordinary = deepcopy(self.section)
        del ordinary['mode']
        self.assertTrue(self.check_section(ordinary))
        self.section['conceptQuiz'].append(self.section['conceptQuiz'][0])
        self.assertTrue(self.check_section())

    def test_every_option_needs_feedback(self):
        self.section['conceptQuiz'][0]['options'][1]['feedback'] = '  '
        self.assertTrue(self.check_section())

    def test_no_theory_and_only_easy_questions(self):
        self.section['blocks'] = [{'type': 'text', 'body': 'Theory'}]
        self.assertTrue(self.check_section())
        del self.section['blocks']
        self.section['conceptQuiz'][0]['difficulty'] = 'medium'
        self.assertTrue(self.check_section())

    def test_figure_requires_label_and_word_bank(self):
        self.section['figure'] = {'id': 'figure', 'type': 'mc', 'difficulty': 'easy'}
        self.assertTrue(self.check_section())


if __name__ == '__main__':
    unittest.main()
