import { env } from '$env/dynamic/public';
import { createJournal } from '@facile/journal';
import { handleErrorWith } from '@facile/journal/sveltekit';

const url = env.PUBLIC_JOURNAL_URL || 'https://journal.facile.studio/api';
const key =
	env.PUBLIC_JOURNAL_KEY ||
	'journal_pub_suite_ayWEHUnTQODAlr6MTwyTYCJHMWHVXxoMUHe2U2MZfCQ';

const journal =
	url && key
		? createJournal({
				url,
				key
			})
		: null;

journal?.install();

export const handleError = journal
	? handleErrorWith(journal)
	: ({ message }: { message: string }) => ({ message });
