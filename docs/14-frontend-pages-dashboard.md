# Фронтенд: Dashboard

[← Auth та Landing](./13-frontend-pages-auth-landing.md) | [De-Identify Wizard →](./15-frontend-pages-de-identify.md)

---

## Dashboard.tsx

Головна сторінка після логіну. Відображає метрики, графіки та список документів.

### Архітектура компонента

```
Dashboard.tsx (~386 рядків)
├── MetricCard (внутрішній)   ← Карточка з іконкою, числом, описом
├── Recharts AreaChart        ← Графік активності за 30 днів
├── Recharts PieChart         ← Розподіл типів сутностей
├── Documents Table           ← Таблиця документів з пагінацією
└── Skeleton loaders          ← Скелетони під час завантаження
```

### MetricCard — внутрішній компонент

```typescript
interface MetricCardProps {
  title: string;       // "Всього документів"
  value: number;       // 24
  icon: ReactNode;     // <DescriptionIcon />
  color: string;       // '#1565C0'
}

function MetricCard({ title, value, icon, color }: MetricCardProps) {
  return (
    <Card>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
        <Box>
          <Typography variant="h4">{value}</Typography>
          <Typography color="text.secondary">{title}</Typography>
        </Box>
      </Box>
    </Card>
  );
}
```

### Завантаження даних

```typescript
useEffect(() => {
  dispatch(fetchDashboard()); // GET /api/dashboard
}, [dispatch]);
```

### Skeleton під час завантаження

```typescript
if (isLoading) {
  return (
    <Grid container spacing={3}>
      {[1,2,3,4].map(i => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Skeleton variant="rectangular" height={120} />
        </Grid>
      ))}
    </Grid>
  );
}
```
