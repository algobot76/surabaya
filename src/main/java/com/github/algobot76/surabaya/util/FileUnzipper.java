package com.github.algobot76.surabaya.util;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

/*
 * Adapted from https://examples.javacodegeeks.com/core-java/util/zip/zipinputstream/java-unzip-file-example/
 */

public class FileUnzipper {

	public static void unzip(Resource zipfile, String destpath) {
		java.io.File directory = new java.io.File(destpath);

		// if the output directory doesn't exist, create it
		if (!directory.exists())
			directory.mkdirs();

		// buffer for read and write data to file
		byte[] buffer = new byte[2048];

		try {
			InputStream fInput = zipfile.getInputStream();
			ZipInputStream zipInput = new ZipInputStream(fInput);

			ZipEntry entry = zipInput.getNextEntry();

			while (entry != null) {
				String entryName = entry.getName();
				FileSystemResource file = new FileSystemResource(destpath + java.io.File.separator + entryName);

				System.out.println("Unzip file " + entryName + " to " + file.getPath());

				// create the directories of the zip directory
				if (entry.isDirectory()) {
					java.io.File newDir = new java.io.File(file.getPath());
					if (!newDir.exists()) {
						boolean success = newDir.mkdirs();
						if (!success) {
							System.out.println("Problem creating Folder");
						}
					}
				}
				else {
					OutputStream fOutput = file.getOutputStream();
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
