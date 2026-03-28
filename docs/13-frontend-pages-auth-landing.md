# Фронтенд: Автентифікація та лендінг

[← API клієнти](./12-frontend-services-api.md) | [Dashboard →](./14-frontend-pages-dashboard.md)

---

## Auth.tsx — сторінка автентифікації

Компонент має два вигляди (views), що перемикаються за URL:

### LoginView — запит Magic Link

```typescript
// Форма з email полем + react-hook-form + Yup валідація
const schema = yup.object({ email: yup.string().email().required() });

function LoginView() {
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useAppDispatch();

  const onSubmit = (data) => dispatch(requestMagicLink(data.email));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register('email')} label={t('auth.emailLabel')} />
      <Button type="submit">{t('auth.sendLink')}</Button>
    </form>
  );
}
```

### VerifyView — верифікація токену

```typescript
// Автоматично витягує ?token= з URL та верифікує
function VerifyView() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) dispatch(verifyMagicLink(token));
  }, [token]);

  // Обробка помилок: TOKEN_EXPIRED → кнопка "Запросити новий лінк"
  // TOKEN_INVALID → повідомлення про помилку
  // Успіх → redirect на Dashboard
}
```

---

## Landing Page — секції

Landing page складається з 8 компонентів-секцій:

| Компонент | Файл | Призначення |
|-----------|------|-------------|
| `LandingHeader` | `sections/LandingHeader.tsx` | Навігація + кнопка Login |
| `HeroSection` | `sections/HeroSection.tsx` | Головний блок з CTA |
| `FeaturesSection` | `sections/FeaturesSection.tsx` | Можливості системи (6 карток) |
| `ComplianceSection` | `sections/ComplianceSection.tsx` | HIPAA/GDPR/UK DPA/Swiss FADP |
| `TrustBadges` | `sections/TrustBadges.tsx` | Значки відповідності |
| `AboutSection` | `sections/AboutSection.tsx` | Про проєкт |
| `ContactSection` | `sections/ContactSection.tsx` | Форма зворотнього зв'язку |
| `LandingFooter` | `sections/LandingFooter.tsx` | Футер |

Всі секції використовують MUI компоненти (`Box`, `Typography`, `Grid`, `Card`) та i18n для текстів.

---

## About.tsx / Contact.tsx

Статичні сторінки з інформацією про проєкт та формою контакту (react-hook-form + Yup).
