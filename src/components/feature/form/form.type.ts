import { z } from 'zod';

import { formSchema } from './form.data';

export type FormValues = z.infer<typeof formSchema>;
