import { Bundle } from "@/shared/types";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography fontWeight={700} color="primary.main">
          {bundle.name}
        </Typography>

        <Typography variant="body2">
          {bundle.dataAmountMb / 1000} GB • {bundle.durationDays} Days
        </Typography>

        <Typography fontWeight={700}>KES {bundle.price}</Typography>

        <Typography variant="caption" display="block" mt={1}>
          {bundle.explanation}
        </Typography>

        <Box mt={2}>
          <Button fullWidth variant="contained">
            Accept
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
