# Фронтенд: Synthetic Data

[← Processing та Results](./16-frontend-pages-processing-results.md) | [Компоненти →](./18-frontend-components.md)

---

## SyntheticData.tsx

Сторінка генерації синтетичних PHI даних через Faker.js на бекенді.

### Форма генерації

```typescript
// React Hook Form + Yup валідація
const schema = yup.object({
  recordCount: yup.number().min(1).max(1000).required(),
  entityTypes: yup.array().of(yup.string()).min(1).required(),
  locale: yup.string().optional(),
});

const { register, handleSubmit, control } = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
    recordCount: 10,
    entityTypes: ['PERSON', 'EMAIL_ADDRESS'],
    locale: 'en_US',
  },
});

const onSubmit = (data) => dispatch(generateSyntheticData(data));
```

### Відображення результатів

Таблиця з колонками: Entity Type, Generated Value, Locale. Дані зберігаються в `syntheticDataSlice`.

### Типи сутностей для генерації

| Тип | Приклад |
|-----|---------|
| PERSON | John Smith |
| EMAIL_ADDRESS | john.smith@email.com |
| PHONE_NUMBER | (555) 123-4567 |
| US_SSN | 523-45-6789 |
| DATE_TIME | 2024-03-15T10:00:00Z |
| LOCATION | 123 Main St, Springfield, IL |
| CREDIT_CARD | 4111-1111-1111-1111 |
| IP_ADDRESS | 192.168.1.100 |
