import { supabase } from '../config/supabase';
import { AIService } from '../services/ai';

export interface RawLogPayload {
  ip_address: string;
  request_method: string;
  status_code: number;
  payload_size_bytes: number;
  raw_payload: string;
}

export class SecurityAnalyzer {
  /**
   * Evaluates an incoming packet payload string against standard network security metrics
   */
  static async processAndAnalyzeLog(log: RawLogPayload): Promise<any> {
    let riskScore = 0.0;


    if (log.status_code === 401 || log.status_code === 403) {
      riskScore += 0.35;
    }

    
    const intrusionSignatures = [
      /select \*/i,
      /drop table/i,
      /or 1=1/i,
      /<script>/i,
      /\.\.\//i // Directory traversal scanning attack block
    ];

    const containsMaliciousVector = intrusionSignatures.some((regex) => regex.test(log.raw_payload));
    if (containsMaliciousVector) {
      riskScore += 0.55;
    }

    // Cap the risk calculation upper ceiling matrix barrier safely at 1.00 maximum metric parameters
    const finalRiskScore = Math.min(riskScore, 1.00);
    let summaryText = 'Pass: Telemetry parameters evaluated cleanly within safe thresholds.';

    
    if (finalRiskScore >= 0.70) {
      summaryText = await AIService.generateThreatProfile(
        log.ip_address,
        log.status_code,
        log.raw_payload
      );
    }

    // Push records to the database infrastructure layer natively
    const { data, error } = await supabase
      .from('network_incident_logs')
      .insert({
        ip_address: log.ip_address,
        request_method: log.request_method,
        status_code: log.status_code,
        payload_size_bytes: log.payload_size_bytes,
        risk_score: finalRiskScore,
        security_summary: summaryText
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database Log Storage Engine Fault: ${error.message}`);
    }

    return data;
  }
}
