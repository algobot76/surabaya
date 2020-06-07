package com.github.algobot76.surabaya.util;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/*
 * Adapted from https://examples.javacodegeeks.com/core-java/util/zip/zipinputstream/java-unzip-file-example/
 */

public class FileUnzipper {

	public static void unzip(String filepath, String destpath) {
		java.io.File directory = new java.io.File(destpath);

		// if the output directory doesn't exist, create it
		if (!directory.exists())
			directory.mkdirs();

		// buffer for read and write data to file
		byte[] buffer = new byte[2048];

		try {
			FileInputStream fInput = new FileInputStream(filepath);
			ZipInputStream zipInput = new ZipInputStream(fInput);

			ZipEntry entry = zipInput.getNextEntry();

			while (entry != null) {
				String entryName = entry.getName();
				java.io.File file = new java.io.File(destpath + java.io.File.separator + entryName);

				System.out.println("Unzip file " + entryName + " to " + file.getAbsolutePath());

				// create the directories of the zip directory
				if (entry.isDirectory()) {
					java.io.File newDir = new java.io.File(file.getAbsolutePath());
					if (!newDir.exists()) {
						boolean success = newDir.mkdirs();
						if (!success) {
							System.out.println("Problem creating Folder");
						}
					}
				}
				else {
					FileOutputStream fOutput = new FileOutputStream(file);
					int count = 0;
					while ((count = zipInput.read(buffer)) > 0) {
						// write 'count' bytes to the file output stream
						fOutput.write(buffer, 0, count);
					}
					fOutput.close();
				}
				// close ZipEntry and take the next one
				zipInput.closeEntry();
				entry = zipInput.getNextEntry();
			}

			// close the last ZipEntry
			zipInput.closeEntry();

			zipInput.close();
			fInput.close();
		}
		catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}

}
