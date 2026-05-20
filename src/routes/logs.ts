import { Router, Request, Response } from 'express';
import { SecurityAnalyzer, RawLogPayload } from '../pipeline/analyzer';

const router = Router();

// Ingestion Pipeline Endpoint to process raw application network packet headers
router.post('/ingest', async (req: Request, res: Response): Promise<any> => {
  try {
    const { ip_address, request_method, status_code, payload_size_bytes, raw_payload } = req.body;

    // Direct input validator check bounds rules execution
    if (!ip_address || !request_method || !status_code || !raw_payload) {
      return res.status(400).json({ error: 'Payload configuration violation: Missing telemetry components.' });
    }

    const logPayload: RawLogPayload = {
      ip_address,
      request_method,
      status_code: Number(status_code),
      payload_size_bytes: Number(payload_size_bytes || 0),
      raw_payload
    };

    const analysisResult = await SecurityAnalyzer.processAndAnalyzeLog(logPayload);
    
    return res.status(201).json({
      message: 'Network log metadata pipeline verification operational.',
      logRecordId: analysisResult.id,
      riskCalculated: analysisResult.risk_score,
      assessment: analysisResult.security_summary
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
