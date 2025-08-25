import { db } from './db.js';
import { certificates } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

// Interface for storage operations
export class IStorage {
  async getCertificate(certificateNumber) {
    throw new Error('Not implemented');
  }

  async createCertificate(certificateData) {
    throw new Error('Not implemented');
  }

  async checkCertificateExists(certificateNumber) {
    throw new Error('Not implemented');
  }
}

// Database storage implementation
export class DatabaseStorage extends IStorage {
  async getCertificate(certificateNumber) {
    try {
      const result = await db
        .select()
        .from(certificates)
        .where(eq(certificates.certificateNumber, certificateNumber))
        .limit(1);
      
      return result[0] || null;
    } catch (error) {
      console.error('Error getting certificate:', error);
      return null;
    }
  }

  async createCertificate(certificateData) {
    try {
      const newCertificate = {
        id: crypto.randomUUID(),
        certificateNumber: certificateData.certificateNumber,
        gemstoneType: certificateData.gemstoneType,
        caratWeight: certificateData.caratWeight,
        cut: certificateData.cut,
        measurements: certificateData.measurements,
        clarity: certificateData.clarity,
        color: certificateData.color,
        polish: certificateData.polish,
        origin: certificateData.origin,
        imageUrl: certificateData.imageUrl || null,
        issueDate: new Date(),
        createdAt: new Date()
      };

      const result = await db
        .insert(certificates)
        .values(newCertificate)
        .returning();

      return result[0];
    } catch (error) {
      console.error('Error creating certificate:', error);
      throw error;
    }
  }

  async checkCertificateExists(certificateNumber) {
    try {
      const result = await db
        .select({ id: certificates.id })
        .from(certificates)
        .where(eq(certificates.certificateNumber, certificateNumber))
        .limit(1);
      
      return result.length > 0;
    } catch (error) {
      console.error('Error checking certificate exists:', error);
      return false;
    }
  }
}

export const storage = new DatabaseStorage();